import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
import logging


logger = logging.getLogger(__name__)

class NotificationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        user_id = self.scope['url_route']['kwargs']['user_id']
        self.user_group_name = f"user_{user_id}"
        logging.info(f'Logger connect {self.user_group_name} {user_id}')

        await self.channel_layer.group_add(
            self.user_group_name,
            self.channel_name
        )

        await self.accept()


    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.user_group_name,
            self.channel_name
        )
        logger.info(f'Logger disconect {self.user_group_name} {self.channel_name}')
    
    async def receive(self, text_data):
        data = json.loads(text_data)
        message = data['message']

        logger.info(f'Logger recive {message}')

        await self.send(text_data=json.dumps({
            'message': message
        }))

    async def send_message(self, event):
        message = event['message']

        await self.send(text_data=json.dumps({
            'message': message
        }))