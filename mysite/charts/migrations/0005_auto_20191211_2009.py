# Generated by Django 3.0 on 2019-12-11 12:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('charts', '0004_auto_20191211_2008'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chart',
            name='permanent_url',
            field=models.CharField(default='8grx', max_length=6),
        ),
        migrations.AlterField(
            model_name='chart',
            name='title',
            field=models.CharField(default='New Gantt Chart', max_length=100),
        ),
    ]
