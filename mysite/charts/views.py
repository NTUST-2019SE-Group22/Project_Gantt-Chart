from django.shortcuts import get_object_or_404, render, redirect
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser

from rest_framework import viewsets

from .models import Chart
from .serializers import ChartSerializer


# view: chart view page
def view(request, chart_url):
    chart = get_object_or_404(Chart, permanent_url=chart_url)
    context = {
        'chart': chart,
    }
    return render(request, 'charts/chart_edit.html', context)


# edit: chart edit page
@login_required
def edit(request, chart_url):
    chart = get_object_or_404(Chart, permanent_url=chart_url)
    if request.user != chart.owner:
        # TODO: Direct to ERRMSG PAGE
        return render(request, 'charts/test.html',)
    context = {
        'chart': chart,
    }
    return render(request, 'charts/chart_edit.html', context)

# clist: chart list page for user
@login_required
def clist(request):
    charts = Chart.objects.filter(owner=request.user).order_by('-last_modified')
    context = {
        'charts': charts,
    }
    return render(request, 'charts/chart_list.html', context)


@login_required
def create(request):
    chart = Chart.objects.create(owner=request.user)
    chart.save()
    return redirect(chart)


class ChartViewSet(viewsets.ModelViewSet):
    queryset = Chart.objects.all()
    serializer_class = ChartSerializer

# TODO: auth
@csrf_exempt
def api(request, chart_url):
    """
    Retrieve, update or delete a code snippet.
    """
    try:
        chart = Chart.objects.get(permanent_url=chart_url)
    except Chart.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = ChartSerializer(chart)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = ChartSerializer(chart, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        chart.delete()
        return HttpResponse(status=204)
