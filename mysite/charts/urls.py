from django.urls import path
from . import views as chart_views

app_name = 'charts'
urlpatterns = [
    # /r/meow/
    path('r/<str:url_text>/', chart_views.url_direct, name='direct'),
    # /u/user/
    path('u/<str:username>/', chart_views.clist, name='list'),
    # /u/user/ganttchart/
    path('u/<str:username>/<str:chartname>/', chart_views.view, name='view'),
    # /u/user/ganttchart/edit/
    path('u/<str:username>/<str:chartname>/edit/', chart_views.edit, name='edit'),

    # # /records/
    # path('', views.index, name='index'),
    # # /records/5/
    # path('<int:record_id>/', views.detail, name='detail'),
    # # /records/5/edit/
    # path('<int:record_id>/edit/', views.edit, name='edit'),
    # # /records/create/
    # path('create/', views.recordCreate, name='create'),
    # # /records/list/
    # path('list/', views.default_listing, name='list'),
    # # /records/list/2019/7/
    # path('list/<int:year>/<int:month>/', views.month_listing, name='month_list'),
    # # /records/list/now/ -> redirect to now month listing
    # path('list/now/', views.now_listing, name='now_list'),
    # # /records/list/water/
    # path('list/<str:typename>/', views.type_listing, name='type_list'),
    # # /records/total/list/
    # path('total/list/', views.total_listing, name='total_list'),
    # # /records/total/2019/7/
    # path('total/<int:year>/<int:month>/', views.total_detail, name='total_detail'),
    # # /records/total/list/now/
    # path('total/list/now/', views.now_total_listing, name='now_total_list'),
]
