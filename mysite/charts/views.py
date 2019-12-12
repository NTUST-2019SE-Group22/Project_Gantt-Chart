from django.shortcuts import get_object_or_404, render, redirect
from django.contrib.auth.decorators import login_required

from .models import Chart


# view: chart view page
def view(request, username, chartname):
    chart = get_object_or_404(Chart, title=chartname, owner__username=username)
    context = {
        'chart': chart,
    }
    return render(request, 'charts/chart_edit.html', context)


# edit: chart edit page
@login_required
def edit(request, username, chartname):
    chart = get_object_or_404(Chart, title=chartname, owner__username=username)
    if request.user != chart.owner:
        # TODO: Direct to ERRMSG PAGE
        return render(request, 'charts/test.html',)
    context = {
        'chart': chart,
    }
    return render(request, 'charts/chart_edit.html', context)


# url_direct: provide user a short-link to direct to chart page
def url_direct(request, url_text):
    chart = get_object_or_404(Chart, permanent_url=url_text)
    return redirect(chart.get_absolute_url())


# clist: chart list page for user
@login_required
def clist(request, username):
    if request.user.username != username:
        # TODO: Direct to ERRMSG PAGE
        return render(request, 'charts/test.html',)
    charts = Chart.objects.filter(owner=request.user).order_by('-last_modified')
    context = {
        'charts': charts,
    }
    return render(request, 'charts/chart_list.html', context)



