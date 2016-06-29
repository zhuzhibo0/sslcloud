from django.conf.urls import patterns, include, url 
# from django_cas.views import login,logout  
# from django.views.decorators.csrf import csrf_exempt 
# from account import views
from project import views
urlpatterns = patterns('',
#     url(r'^$', views.index), 
     url(r'^$', views.index), 
     url(r'^certs$', views.certs), 
     url(r'^certdetail$', views.certdetail), 
     url(r'^create$', views.create),  
     url(r'^report$', views.report),   
 
     url(r'^getprojectreport$', views.getprojectreport),  
     url(r'^getcerts$', views.getcerts),  
     url(r'^getcert$', views.getcert),  
     url(r'^getproject$', views.getproject),  
     url(r'^createproject$', views.createproject),  
     url(r'^delproject$', views.delproject),  
     
     url(r'^uploadcheckresult$', views.uploadcheckresult),   
#     url(r'^modify$', views.modify),   
)
