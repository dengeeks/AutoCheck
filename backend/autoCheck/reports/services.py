from django.core.cache import cache
import os
import requests
import logging
from django.db import transaction
from django.core.exceptions import ValidationError, PermissionDenied, ObjectDoesNotExist
from .tasks import authenticate_and_get_token

logger = logging.getLogger(__name__)

def create_report(query, code_type):
    api_domain_url = os.getenv("API_DOMAIN")
    token = cache.get('api_token')
    payload = {
        'jsonrpc': '2.0',
        'id': 1,
        'method': 'report.create',
        'params': {
            'query': query,
            'type': code_type    
        }
    }
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {token}'
    }
    response = requests.post(url=api_domain_url, json=payload, headers=headers)
    response.raise_for_status()
    try:
        uuid = response.json()['result']['uuid']
        report_info = get_report(uuid=uuid)
        model, body, body_type, brand_name, car_year = get_additional_info(report_info=report_info)
    except KeyError:
        if response.json().get('error', {}).get('data', {}).get('class') == "AuthenticationException":
            cache.delete('api_token')
            authenticate_and_get_token()
            headers['Authorization'] = f'Bearer {cache.get("api_token")}'
            response = requests.post(url=api_domain_url, json=payload, headers=headers)
            response.raise_for_status()
            uuid = response.json()['result']['uuid']
            report_info = get_report(uuid=uuid)
            model, body, body_type, brand_name, car_year  = get_additional_info(report_info=report_info)
        else:
            raise
    except Exception as e:
        raise Exception(f'Key exception {e}')
    return uuid, model, body, body_type, brand_name, car_year

def get_additional_info(report_info):
    logger.warning(f'Additional report info {report_info}')
    try:
        content = report_info.get('content', {})
        tech_data = content.get('content', {}).get('tech_data', {})
        
        brand_name = tech_data.get('brand', {}).get('name', {}).get('original')
        car_year = tech_data.get('year')
        model = tech_data.get('model', {}).get('name', {}).get('normalized')
        body = content.get('query', {}).get('body')
        body_type = content.get('query', {}).get('type')

    except KeyError as e:
        logger.error(f"KeyError occurred: {e}")
        raise
    except requests.HTTPError as e:
        logger.error(f"HTTPError occurred: {e}")
        raise
    except Exception as e:
        logger.error(f'An unexpected error occurred: {e}')
        raise
    return model, body, body_type, brand_name, car_year

def get_report(uuid):
    api_domain_url = os.getenv("API_DOMAIN")
    token = cache.get('api_token')
    payload = {
        'jsonrpc': '2.0',
        'id': 1,
        'method': 'report.get',
        'params': {
            'uuid': uuid,
        }
    }
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {token}'
    }
    response = requests.post(url=api_domain_url, json=payload, headers=headers)
    response.raise_for_status()
    return response.json()['result']

def upgrade_report(uuid, report, user):
    try:
        with transaction.atomic():
            if user.request_quantity > 0 and not report.is_upgraded:
                api_domain_url = os.getenv("API_DOMAIN")
                token = cache.get('api_token')
                payload = {
                    'jsonrpc': '2.0',
                    'id': 1,
                    'method': 'report.upgrade',
                    'params': {
                        'uuid': report.report_uuid,
                    }
                }
                headers = {
                    'Content-Type': 'application/json',
                    'Authorization': f'Bearer {token}'
                }
                response = requests.post(url=api_domain_url, json=payload, headers=headers)
                response.raise_for_status()
                user.request_quantity -= 1
                user.save()
                report.is_upgraded = True
                report.save()
                return uuid
                
    except (ValidationError, PermissionDenied, ObjectDoesNotExist) as e:
        logger.error(f'Ошибка при получении полного отчета: {e}')
        raise
    except Exception as e:
        logger.error(f'Ошибка при получении полного отчета: {e}')
        raise