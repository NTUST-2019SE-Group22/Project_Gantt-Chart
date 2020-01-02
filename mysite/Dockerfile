FROM python:3.7
LABEL maintainer chiachun2491
ENV PYTHONUNBUFFERED 1
RUN mkdir /docker_django
WORKDIR /docker_django
COPY . /docker_django
RUN pip install -r requirements.txt
# RUN pip install  -i  https://pypi.python.org/simple/  -r requirements.txt