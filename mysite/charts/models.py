from django.db import models
from django.urls import reverse
from datetime import datetime
import base64
import hashlib
import json

# hash salt when generate permanent url
HASH_SALT = 'DUCK'
# default=base64.b64encode(
#         hashlib.md5((str(created_at) + HASH_SALT).encode('utf-8')).digest(), altchars=b"-_")[:4].decode("utf-8")


class Chart(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey('auth.User', on_delete=models.CASCADE, blank=True, null=True)
    title = models.CharField(max_length=100, default='New Gantt Chart')
    last_modified = models.DateTimeField(auto_now=True)
    tasks = models.TextField(blank=True, null=True)
    permanent_url = models.CharField(max_length=6, blank=True, null=True)

    def __str__(self):
        return self.owner.__str__() + '-' + self.title

    # TODO: waiting for url setting
    def get_absolute_url(self):
        return reverse('charts:edit', args=[self.owner, self.title])
