from django.contrib import admin
from import_export import resources
from import_export.admin import ImportExportModelAdmin
from .models import Chart


class ChartResource(resources.ModelResource):
    class Meta:
        model = Chart


@admin.register(Chart)
class ChartAdmin(ImportExportModelAdmin):
    list_display = ['__str__', 'last_modified', 'permanent_url', ]

