from dotenv import load_dotenv
import os
import requests
from requests.exceptions import RequestException
from django.core.cache import cache
from celery import shared_task
from json.decoder import JSONDecodeError
import logging


dotenv_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env')
load_dotenv(dotenv_path)
api_domain_url = os.getenv("API_DOMAIN")
logger = logging.getLogger(__name__)

def authenticate_and_get_token():
    api_domain_url = os.getenv("API_DOMAIN")
    payload = {
        'jsonrpc': '2.0',
        'id': 1,
        'method': 'auth.login',
        'params': {
            'email': os.getenv("API_USER_EMAIL"),
            'password': os.getenv("API_USER_PASSWORD")    
        }
    }
    headers = {
        'Content-Type': 'application/json'
    }
    try:
        response = requests.post(url=api_domain_url, json=payload, headers=headers)
        response.raise_for_status()
        token = response.json().get('result', {}).get('token')
        if token:
            cache.set('api_token', token, timeout=None)
            return token
    except (RequestException, KeyError) as e:
        logger.error(f'Authorization error {e}')
    return None
    
@shared_task
def update_auth_token():
    cached_token = cache.get('api_token')
    logger.warning(f'TOKEN {cached_token}')
    if cached_token:
        payload = {
            'jsonrpc': '2.0',
            'id': 1,
            'method': 'token.get',
            'params': {}
        }
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {cached_token}'
        }
        try:
            response = requests.post(url=api_domain_url, json=payload, headers=headers)
            response.raise_for_status()
        except requests.exceptions.RequestException as e:
            cache.delete('api_token')
            authenticate_and_get_token()
    else:
        authenticate_and_get_token()