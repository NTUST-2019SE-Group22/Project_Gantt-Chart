---
title: 'Gantt Chart Editor'
disqus: hackmd
---

Gantt Chart Editor (GCE)
===
![downloads](https://img.shields.io/github/downloads/atom/atom/total.svg) ![build](https://img.shields.io/appveyor/ci/:user/:repo.svg) ![chat](https://img.shields.io/discord/:serverId.svg)

## Screenshot
![](https://i.imgur.com/jnAeU0b.png)

## Table of Contents

[TOC]

## Quick Start

We provide docker-compose version, or you can just use simple Django version.

### Django Project Files

Please modify following files:
```python
# /mysite/mysite/settings/base.py

EMAIL_HOST_USER = '---ENTER YOUR EMAIL HERE---'
EMAIL_HOST_PASSWORD = '---ENTER YOUR PASSWORD HERE---'
```
Create `local_settings.py`
```python
# /mysite/mysite/settings/local_settings.py
from .base import *


# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}
```
How to excute?
```
$ python manage.py makemigrations --settings=mysite.settings.local_settings
$ python manage.py migrate --settings=mysite.settings.local_settings
$ python manage.py runserver --settings=mysite.settings.local_settings

Watching for file changes with StatReloader
Performing system checks...

System check identified no issues (0 silenced).
January 03, 2020 - 22:59:14
Django version 3.0, using settings 'mysite.settings.local_settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```
If you want manage admin site, following the guide

    $ python manage.py createsuperuser --settings=mysite.settings.local_settings
    
### Docker-compose

Please modify following files:
```yaml
# docker-compose.yml
version: '3.5'
services:

  nginx:
    container_name: gantt-nginx
    build: ./nginx
    restart: always
    volumes:
      - django_data:/docker_django
      - ./log:/var/log/nginx
    networks:
      - proxy
    depends_on:
      - django
    environment:
      - VIRTUAL_HOST= ---YOUR DOMAIN NAME HERE--- # Edit here
      - VIRTUAL_NETWORK=nginx-proxy
      - VIRTUAL_PORT=80
      - LETSENCRYPT_HOST= ---YOUR DOMAIN NAME HERE--- # Edit here
      - LETSENCRYPT_EMAIL= ---YOUR EMAIL HERE--- # Edit here

  django:
    container_name: gantt-django
    build: ./mysite
    restart: always
    command: uwsgi --ini uwsgi.ini
    volumes:
      - django_data:/docker_django
    networks:
      - proxy
      - default
    depends_on:
      - db

  db:
    container_name: gantt-postgres
    restart: always
    ports:
      - "5432"
    image: postgres
    environment:
      POSTGRES_PASSWORD: password123
    volumes:
      - ./pgdata:/var/lib/postgresql/data/

volumes:
  django_data:

networks:
  proxy:
    external:
      name: self-nginx-proxy
```

```conf
# nginx/my_nginx.conf
# the upstream component nginx needs to connect to
upstream uwsgi {
    # server api:8001; # use TCP
    server unix:/docker_django/app.sock; # for a file socket
}

# configuration of the server
server {
    # the port your site will be served on
    listen    80;
    # index  index.html;
    # the domain name it will serve for
    # substitute your machine's IP address or FQDN
    server_name ---YOUR DOMAIN NAME HERE---; # Edit here
    charset     utf-8;

    client_max_body_size 75M;   # adjust to taste

    location /static {
        alias /docker_django/static; # your Django project's static files - amend as required
    }

    location / {
        uwsgi_pass  uwsgi;
        include     /etc/nginx/uwsgi_params; # the uwsgi_params file you installed
    }
}
```
Before you start docker-compose, please start docker-letsencrypt-nginx-proxy-companion & nginx-proxy container:
https://github.com/twtrubiks/docker-letsencrypt-django-nginx-proxy-uwsgi-postgres

Start Command:
```
$ sudo docker-compose build --no-cache
$ sudo docker-compose up -d


Creating gantt-postgres ... done
Creating gantt-django   ... done
Creating gantt-nginx    ... done
```
Go to bash of container:
```
$ sudo docker ps

CONTAINER ID        IMAGE                               COMMAND                  CREATED             STATUS              PORTS                                      NAMES
c63c36ce0521        ntust_sw_engr_project_nginx         "nginx -g 'daemon of…"   53 seconds ago      Up 51 seconds       80/tcp                                     gantt-nginx
94330536f27e        ntust_sw_engr_project_django        "uwsgi --ini uwsgi.i…"   55 seconds ago      Up 53 seconds                                                  gantt-django
2fd7a04c3c2c        postgres                            "docker-entrypoint.s…"   57 seconds ago      Up 55 seconds       0.0.0.0:32782->5432/tcp                    gantt-postgres

$ sudo docker exec -it <gantt-django-container-id> bash

root@94330536f27e:/docker_django# python manage.py collectstatic
root@94330536f27e:/docker_django# python manage.py makemigrations
root@94330536f27e:/docker_django# python manage.py migrate
root@94330536f27e:/docker_django# python manage.py createsuperuser
root@94330536f27e:/docker_django# exit
```
