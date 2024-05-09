FROM python:3.11

WORKDIR /usr/src/app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

EXPOSE 8000
RUN pip install --upgrade pip

COPY ./req.txt /temp/req.txt
RUN pip install -r /temp/req.txt

COPY /backend/autoCheck /usr/src/app/

RUN apt-get update \
    && apt-get install -y netcat-traditional \
    && rm -rf /var/lib/apt/lists/* \
    && ln -sf /usr/bin/nc.traditional /usr/bin/nc

COPY /backend/autoCheck/entrypoint.sh /usr/src/app/entrypoint.sh
RUN chmod +x /usr/src/app/entrypoint.sh


ENTRYPOINT ["/usr/src/app/entrypoint.sh"]

CMD ["daphne", "config.asgi:application", "--bind", "0.0.0.0", "--port", "8000"]