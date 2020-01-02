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
    title = models.CharField(max_length=100, default=datetime.now)
    last_modified = models.DateTimeField(auto_now=True)
    tasks = models.TextField(blank=True, null=True)
    permanent_url = models.CharField(max_length=6, default='______')

    def save(self, *args, **kwargs):
        if self.permanent_url == '______':
            new_id = str(datetime.now)
            while True:
                new_id = base64.b64encode(hashlib.md5((new_id + HASH_SALT).encode('utf-8')).digest(),
                                      altchars=b"ab")[:6].decode("utf-8")
                if not Chart.objects.filter(permanent_url=new_id).exists():
                    break
            self.permanent_url = new_id
        else:
            pass
        super().save(*args, **kwargs)  # Call the "real" save() method.

    def __str__(self):
        return self.owner.__str__() + '-' + self.title

    # TODO: waiting for url setting
    def get_absolute_url(self):
        return reverse('charts:view', args=[self.permanent_url])

    def get_edit_url(self):
        return reverse('charts:edit', args=[self.permanent_url])

    def get_api_url(self):
        return reverse('chart_api', args=[self.permanent_url])
