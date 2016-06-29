# encoding:utf-8
from django.shortcuts import render
from django.http import HttpResponse, HttpRequest, HttpResponseRedirect
from django.shortcuts import render, render_to_response
from django.contrib.auth.decorators import login_required,user_passes_test,permission_required
from django.template import RequestContext
from django.views.decorators.csrf import csrf_exempt 
import json
from setting.models import notify_rule
from project.models import project


def notifyrules(request):
    return render_to_response('notifyrule.html' ,{},context_instance=RequestContext(request))

def createnotifyrule(request):
    return render_to_response('createnotifyrule.html' ,{},context_instance=RequestContext(request))

def editnotifyrule(request):
    userid=1  
    try:
        id = request.GET['id']
        data = notify_rule.objects.filter(user_id=userid,id=id)
        if len(data)==0:
            return HttpResponse(u'发生错误,不存在该规则')
        rl = data[0]
        
        return render_to_response('editnotifyrule.html',
                                  {'id':rl.id,'name':rl.name,'email':rl.email,'notify_threshold':rl.notify_threshold,
                                         'repeat_interval':rl.repeat_interval,'expire_alert_day':rl.expire_alert_day},
                                  context_instance=RequestContext(request))    
        
    except Exception,e:
        return HttpResponse(u'发生错误')
    



import re
def validateEmail(email):

    if len(email) > 7:
        if re.match("^.+\\@(\\[?)[a-zA-Z0-9\\-\\.]+\\.([a-zA-Z]{2,3}|[0-9]{1,3})(\\]?)$", email) != None:
            return 1
    return 0
@csrf_exempt
def createrule(request):
    userid=1  
    try:
        res = []
        data = json.loads(request.body)
        print data
        name= data['name']
        email=data['email']
        repeat_interval= int(data['repeat_interval'])
        expire_alert_day=int(data['expire_alert_day'])
        
        if len(name) <1: 
            return HttpResponse(json.dumps({'result':False,'data':u'输入参数错误'}))
        
        if not validateEmail(email):
            return HttpResponse(json.dumps({'result':False,'data':u'邮件地址不正确'}))
         
        if repeat_interval < 0 or repeat_interval>12:
            return HttpResponse(json.dumps({'result':False,'data':u'输入参数错误'}))
        
        if expire_alert_day < 0 or expire_alert_day>91:
            return HttpResponse(json.dumps({'result':False,'data':u'输入参数错误'}))
            
        
        rule = notify_rule.objects.filter(name=name,user_id=userid)
        if len(rule) > 0:
            return HttpResponse(json.dumps({'result':False,'data':u'该名称已经存在'}))
         
        newrule = notify_rule(user_id=userid,name=name,email=email,repeat_interval=repeat_interval,expire_alert_day=expire_alert_day)    
        newrule.save()
        return HttpResponse(json.dumps({'result':True,'data':res})) 
    except Exception,e:
        print e
        return HttpResponse(json.dumps({'result':False,'data':str(e)}))
    
@csrf_exempt
def modifyrule(request):
    userid=1  
    try:
        res = []
        data = json.loads(request.body)
        print data
        id= data['id']
        name=data['name']
        email=data['email']
        repeat_interval= int(data['repeat_interval'])
        expire_alert_day=int(data['expire_alert_day'])
         
        
        if not validateEmail(email):
            return HttpResponse(json.dumps({'result':False,'data':u'邮件地址不正确'}))
         
        if repeat_interval < 0 or repeat_interval>12:
            return HttpResponse(json.dumps({'result':False,'data':u'输入参数错误'}))
        
        if expire_alert_day < 0 or expire_alert_day>91:
            return HttpResponse(json.dumps({'result':False,'data':u'输入参数错误'}))
            
        
        rule = notify_rule.objects.filter(name=name,id=id,user_id=userid)
        if len(rule) == 0:
            return HttpResponse(json.dumps({'result':False,'data':u'规则不存在'}))
        rule= rule[0]
        
        rule.email=email
        rule.repeat_interval=repeat_interval
        rule.expire_alert_day=expire_alert_day  
        rule.save()
        return HttpResponse(json.dumps({'result':True,'data':res})) 
    except Exception,e:
        print e
        return HttpResponse(json.dumps({'result':False,'data':str(e)}))

def getnotifyrules(request):
    userid=1  
    try:
        res = []
        data = notify_rule.objects.filter(user_id=userid)
        for i in data:
            res.append({'id':i.id,'name':i.name,'email':i.email,'notify_threshold':i.notify_threshold,
                        'repeat_interval':i.repeat_interval,'expire_alert_day':i.expire_alert_day
                         })
            
        return HttpResponse(json.dumps({'result':True,'data':res})) 
    except Exception,e:
        print e
        return HttpResponse(json.dumps({'result':False,'data':str(e)}))
    
    
    
def delnotifyrule(request):
    userid=1  
    try:
        nid=request.GET['id'] 
        
        pj=project.objects.filter(notify_rule_id = nid)
        if len(pj)>0: 
            return HttpResponse(json.dumps({'result':False,'data':u'已被引用，无法删除.'}))
        
        data = notify_rule.objects.filter(user_id=userid,id=nid)
        
        if len(data) ==0:
            return HttpResponse(json.dumps({'result':False,'data':u'找不到该规则.'}))
        
        for j in data:
            j.delete()  
            
        return HttpResponse(json.dumps({'result':True,'data':''})) 
    except Exception,e:
        print e
        return HttpResponse(json.dumps({'result':False,'data':str(e)}))