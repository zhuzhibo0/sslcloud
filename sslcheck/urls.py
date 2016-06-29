from django.conf.urls import patterns, include, url 
# from django_cas.views import login,logout  
# from django.views.decorators.csrf import csrf_exempt 
from sslcheck import views

urlpatterns = patterns('',
#     url(r'^$', views.index), 
     url(r'^checkdomain$', views.checkdomain),   
     url(r'^delchecktask$', views.delchecktask),   
     
#     url(r'^modify$', views.modify),   
)
