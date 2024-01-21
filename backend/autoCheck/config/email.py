from djoser import email
from django.template.loader import render_to_string
from django.core.mail import EmailMessage
from main.models import SocialNetwork
from django.utils.html import strip_tags
import logging


logger = logging.getLogger(__name__)

class ActivationEmail(email.ActivationEmail):
    template_name = 'email/EmailActivation.html'

    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)
        social_networks = SocialNetwork.objects.all()
        context_data['social_networks'] = social_networks
        return context_data

    def send(self, to, *args, **kwargs):
        context_data = self.get_context_data()
        user = context_data.get('user')

        subject = 'Активация аккаунта пользователя {} {}'.format(user.first_name, user.last_name)

        email_content = render_to_string(self.template_name, context_data)

        email_message = EmailMessage(
            subject=subject,
            body=email_content,
            to=[user.email],
        )
        email_message.content_subtype = 'html'
        email_message.send()


class PasswordResetEmail(email.PasswordResetEmail):
    template_name = 'email/EmailPasswordChange.html'
    
    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)
        social_networks = SocialNetwork.objects.all()
        context_data['social_networks'] = social_networks
        return context_data

    def send(self, to, *args, **kwargs):
        context_data = self.get_context_data()
        user = context_data.get('user')

        subject = 'Смена пароля {} {}'.format(user.first_name, user.last_name)

        email_content = render_to_string(self.template_name, context_data)
        logger.info(f'Data: {context_data}, User: {user}')

        email_message = EmailMessage(
            subject=subject,
            body=email_content,
            to=[user.email],
        )
        email_message.content_subtype = 'html'
        email_message.send()

