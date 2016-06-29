# encoding:utf-8
from django.shortcuts import render
from django.http import HttpResponse, HttpRequest, HttpResponseRedirect
from django.shortcuts import render, render_to_response
from django.contrib.auth.decorators import login_required,user_passes_test,permission_required
from django.template import RequestContext
from django.views.decorators.csrf import csrf_exempt 
import json
from setting.models import server_setting
from sslcheck.models import checktask
#from checkasync import indefinemodule

define_modules={'basic':'--certinfo_basic ',
                'ccs':'--openssl_ccs ',
                'hsts':'--hsts ',
                'heartbleed':'--heartbleed ',
                'poodle':'--poodle ',
                }

def indefinemodule(name):
    try:
        define_modules[name]
        return True
    except:
        return False
    
# check request 
def requestfrommaster(request):
    master =None
    try:
        glbcfg=server_setting.objects.all();
        
        for i in glbcfg:
            master = i.master_address
            break
        print master
        if 'HTTP_X_FORWARDED_FOR' in request.META:
            ip =  request.META['HTTP_X_FORWARDED_FOR']  
        else:  
            ip = request.META['REMOTE_ADDR']  
             
        if cmp(ip,master):
            return None
        master = i.master_address+':'+str(i.port)
    except Exception,e:
        print  'requestfrommaster:'+str(e)
        return None
    return master
 
def delchecktask(request): 
    try:
        masterserver = requestfrommaster(request)
        if not masterserver:
            return HttpResponse(json.dumps({'result':False,'info':'permission deny'})) 
        
        task = checktask.objects.filter(project_id=int(request.GET['id']))
        for i in task:
            i.delete()
        return HttpResponse(json.dumps({'result':True,'info':'OK'})) 
    except Exception,e:
        return HttpResponse(json.dumps({'result':False,'info':'delchecktask'+str(e)})) 
    
    
def checkdomain(request): 
    try:
        masterserver = requestfrommaster(request)
        if not masterserver:
            return HttpResponse(json.dumps({'result':False,'info':'permission deny'})) 

        for i in request.GET['module'].split(','): 
            if not indefinemodule(i):
                return HttpResponse(json.dumps({'result':False,'info':'module format error'}))
        
        task = checktask.objects.filter(project_id=int(request.GET['project_id']),domain=request.GET['domain'])
        
        if len(task)==0:
            task = checktask(project_id=int(request.GET['project_id']),domain=request.GET['domain'],
                             module=request.GET['module'],frequency=request.GET['frequency'])
            task.save()
        else:
            for i in task: 
                i.module =request.GET['module']
                i.frequency=request.GET['frequency']
                i.save()
                break
            
        return HttpResponse(json.dumps({'result':True,'info':'OK'})) 
    except Exception,e:
        return HttpResponse(json.dumps({'result':False,'info':'checkdomain'+str(e)})) 
 