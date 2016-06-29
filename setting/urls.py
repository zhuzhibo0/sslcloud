from django.conf.urls import patterns, include, url 
# from django_cas.views import login,logout  
# from django.views.decorators.csrf import csrf_exempt 
from setting import views
urlpatterns = patterns('',
     url(r'^notifyrules$', views.notifyrules),  
     url(r'^createnotifyrule$', views.createnotifyrule),  
     url(r'^editnotifyrule$', views.editnotifyrule),  
     
     
     url(r'^modifyrule', views.modifyrule),   
     url(r'^getnotifyrules$', views.getnotifyrules), 
     url(r'^delnotifyrule$', views.delnotifyrule),  
     url(r'^createrule$', views.createrule),  
#     url(r'^getinfo$', views.getinfo),   
#     url(r'^modify$', views.modify),   
)
