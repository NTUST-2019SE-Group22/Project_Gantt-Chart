# Generated by Django 3.0 on 2019-12-11 12:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('charts', '0002_auto_20191211_2006'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chart',
            name='permanent_url',
            field=models.CharField(blank=True, max_length=6, null=True),
        ),
        migrations.AlterField(
            model_name='chart',
            name='title',
            field=models.CharField(default='2019-12-11 20:07:30', max_length=100),
        ),
    ]
