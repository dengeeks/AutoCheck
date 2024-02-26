import logging
import uuid
from json import JSONDecodeError
import requests
from rest_framework import permissions, status, views, generics
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import get_object_or_404
from django.utils import timezone
from .models import UserReport
from .serializers import ReportCreateSerializer, UserReportSerializer
from .services import create_report, get_report, upgrade_report
from rest_framework.pagination import PageNumberPagination


logger = logging.getLogger(__name__)
class CreateReportAPIView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request):
        if request.user.request_quantity > 0:
            serializer = ReportCreateSerializer(data=request.data, context={'request': request})
            if serializer.is_valid():
                code_type = serializer.validated_data.get('code_type')
                query = serializer.validated_data.get('query')
                try: 
                    report_uuid, model, body, body_type, brand_name, car_year = create_report(query=query, code_type=code_type)
                except (KeyError, ValueError, JSONDecodeError, requests.RequestException) as e:
                    logger.error(f'CreateReportAPIView exception {e}')
                    return Response({"error": "Ошибка при обработке запроса"}, status=status.HTTP_400_BAD_REQUEST)
                new_uuid = uuid.uuid4()

                UserReport.objects.create(
                    uuid=new_uuid,
                    user=request.user,
                    report_uuid=report_uuid,
                    model=f'{brand_name} {model} {car_year}',
                    body=body,
                    body_type=body_type,
                )
                return Response({"uuid": new_uuid}, status=status.HTTP_201_CREATED)
            else:
                logger.error(serializer.errors)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "У вас недостаточно запросов"}, status=status.HTTP_400_BAD_REQUEST)

class GetReportsListAPIView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserReportSerializer
    pagination_class = PageNumberPagination
    pagination_class.page_size = 15

    def get_queryset(self):
        queryset = UserReport.objects.filter(user=self.request.user, is_upgraded=True).order_by('-created_at')
        
        body_filter = self.request.query_params.get('body', None)
        if body_filter is not None:
            queryset = queryset.filter(body__icontains=body_filter)
        
        return queryset

class ReportDetailAPIView(views.APIView):
    def get(self, request, uuid):
        report = get_object_or_404(UserReport, uuid=uuid)
 
        if report.expiry_date < timezone.now():
            return Response({"error": "Отчет истек"}, status=status.HTTP_403_FORBIDDEN)
        
        try:
            report_data = get_report(uuid=report.report_uuid)
            serializer = UserReportSerializer(report)
            serialized_report_data = serializer.data
            response_data = {
                "report": serialized_report_data,
                "data": report_data,
            }
            return Response({"data": response_data}, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f'Ошибка при получении отчета: {e}')
            return Response({"error": "Не удалось получить отчет"}, status=status.HTTP_400_BAD_REQUEST)

class ReportUpgradeAPIView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request, uuid):
        report = get_object_or_404(UserReport, user=request.user, uuid=uuid)
        uuid = upgrade_report(uuid=uuid, user=request.user, report=report)
        return Response({"uuid": uuid}, status=status.HTTP_200_OK)

class ReportChange(views.APIView):
    def post(self, request, uuid):
        try:
            report = get_object_or_404(UserReport, user=request.user, uuid=uuid)
            report.is_favorite = request.data.get('is_favorite', report.is_favorite)
            report.save()
            return Response(status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({"error": "Отчет не найден"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
class GetFavoriteReportList(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserReportSerializer 

    def get_queryset(self):
        return UserReport.objects.filter(user=self.request.user, is_upgraded=True, is_favorite=True).order_by('-created_at')