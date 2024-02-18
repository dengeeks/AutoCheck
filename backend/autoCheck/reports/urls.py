from django.urls import path, re_path
from .views import CreateReportAPIView, GetReportsListAPIView, ReportDetailAPIView, ReportUpgradeAPIView, ReportChange, GetFavoriteReportList

urlpatterns = [
    path('report/create/', CreateReportAPIView.as_view()),
    re_path('report/detail/(?P<uuid>[0-9a-f-]{36})/$', ReportDetailAPIView.as_view()),
    path('reports/list/', GetReportsListAPIView.as_view()),
    path('reports/favorite/list/', GetFavoriteReportList.as_view()),
    re_path('report/upgrade/(?P<uuid>[0-9a-f-]{36})/$', ReportUpgradeAPIView.as_view()),
    re_path('report-change/(?P<uuid>[0-9a-f-]{36})/$', ReportChange.as_view()),
]