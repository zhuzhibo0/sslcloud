# encoding:utf-8
import django
from django.shortcuts import render
from django.http import HttpResponse, HttpRequest, HttpResponseRedirect
from django.shortcuts import render, render_to_response
from django.contrib.auth.decorators import login_required,user_passes_test,permission_required
from django.template import RequestContext
from django.views.decorators.csrf import csrf_exempt 
import json,os,datetime,time
from setting.models import distribute_server,notify_rule
from project.models import project,checkresult,certinfo,sql,alertlog
import urllib
from email.MIMEMultipart import MIMEMultipart
from email.MIMEText import MIMEText
from email.MIMEImage import MIMEImage
from smtplib import SMTP
from email.utils import COMMASPACE,formatdate
from setting.models import server_setting
###web page start
def index(request):
    return render_to_response('index.html' ,{},context_instance=RequestContext(request))
def certs(request):
    return render_to_response('cert.html' ,{},context_instance=RequestContext(request))

def certdetail(request):
    return render_to_response('certdetail.html' ,{'id':request.GET['id']},context_instance=RequestContext(request))


def create(request):
    nrules = notify_rule.objects.filter(user_id=1)
    return render_to_response('create.html' ,{'notiy_rules':nrules},context_instance=RequestContext(request))

def report(request):
    return render_to_response('report.html' ,{'id':request.GET['id']},context_instance=RequestContext(request))
 
###web page end

def getprojectreport(request):
    userid=1  
    try:
        pid = request.GET['id']
        
        data = project.objects.filter(user_id=userid,id=pid)
        if len(data) ==0:
            return HttpResponse(json.dumps({'result':False,'data':'project id error'}))
        p =  data[0]
        
        nr=notify_rule.objects.filter(id=p.notify_rule_id)
        
        chkres = []
        d = checkresult.objects.filter(project_id=pid)
        normal_num=0
        warning_num=0
        error_num=0
        for i in d:
            cert = certinfo.objects.filter(id=i.certinfo_id)
            if len(cert)==0:
                cert = {}
            else:
                tmp = cert[0]
                expdate=tmp.notAfter-time.time()
                if expdate< 0:
                    expdate=0
                else:
                    expdate = int(expdate/(60*60*24)+0.5)
                cert ={'id':tmp.id,'sha1_fingerprint':tmp.sha1_fingerprint,'common_name':tmp.common_name,'issuer_name':tmp.issuer_name,'issuer_orgname':tmp.issuer_orgname,
                       'serial_number':tmp.serial_number,'signature_algorithm':tmp.signature_algorithm,'publicKeyAlgorithm':tmp.publicKeyAlgorithm,'publicKeySize':tmp.publicKeySize,
                       'chain_order_valid':tmp.chain_order_valid,'ocsp_trusted':tmp.ocsp_trusted,'trusted':tmp.trusted,'expdate':expdate}

            
            if i.statuslevel==0:
                normal_num=normal_num+1;
            elif i.statuslevel==1:
                warning_num=warning_num+1;
            elif i.statuslevel==2:
                error_num=error_num+1;
             
            chkres.append({'ip':i.ip,'lastcheckts':time.strftime('%Y.%m.%d %H:%M:%S',time.localtime(float(i.lastcheckts))),
                           'statuslevel':i.statuslevel,
                           'statusinfo':i.statusinfo,
                           'heartbleed':i.heartbleed,
                           'poodle':i.poodle,
                           'ccs':i.ccs,
                           'hsts':i.hstc,'certinfo':cert,'hostname_validation':i.hostname_validation})
            
        res = {'id':p.id,'name':p.name,'domain':p.domain,'port':p.port,'check_frequency':p.check_frequency,
                        'notify_rule_name':nr[0].name, 'create_time':time.strftime('%Y.%m.%d',time.localtime(float(p.create_time))),
                        'heartbleed_check':p.heartbleed_check,'ccs_check':p.ccs_check,'poodle_check':p.poodle_check,
                         'hsts_check':p.hsts_check, 'status':p.status,'statusinfo':p.statusinfo,'checkres':chkres,
                         'normal':normal_num,'warning':warning_num,'error':error_num
                        } 
        ##print res
        
        return HttpResponse(json.dumps({'result':False,'data':res}))
           
    except Exception,e:    
        return HttpResponse(json.dumps({'result':False,'data':str(e)}))

def getcert(request):
    userid=1  
    try:
        res = []
        data = certinfo.objects.filter(id=request.GET['id'])
        for i in data:
            res={'sha1_fingerprint':i.sha1_fingerprint,'common_name':i.common_name,'issuer_name':i.issuer_name,
            'issuer_orgname':i.issuer_orgname,'serial_number':i.serial_number,'signature_algorithm':i.signature_algorithm,
             'publicKeyAlgorithm':i.publicKeyAlgorithm,'publicKeySize':i.publicKeySize,'chain_order_valid':i.chain_order_valid,
              'ocsp_trusted':i.ocsp_trusted,'notBefore':time.strftime('%Y.%m.%d',time.localtime(float(i.notBefore))),
              'notAfter':time.strftime('%Y.%m.%d',time.localtime(float(i.notAfter))),'trusted':i.trusted}
            
        return HttpResponse(json.dumps({'result':True,'data':res})) 
    except Exception,e:
        print e
        return HttpResponse(json.dumps({'result':False,'data':str(e)}))
        
# 0=wait for upload  1=wait for checking 2=normal 3=warning 4=error 5=expired
STATUS_STR=[u'任务加载中',u'检测中',u'正常',u'警告',u'发生错误',u'过期']
    
def getproject(request):
    userid=1  
    try:
        res = []
        data = project.objects.filter(user_id=userid)
        for i in data:
            ntrule = notify_rule.objects.filter(id =i.notify_rule_id)
            
            res.append({'id':i.id,'name':i.name,'domain':i.domain,'port':i.port,'check_frequency':i.check_frequency,
                        'notify_rule_id':i.notify_rule_id, 'create_time':time.strftime('%Y.%m.%d',time.localtime(float(i.create_time))),
                        'heartbleed_check':i.heartbleed_check,'ccs_check':i.ccs_check,
                         'hsts_check':i.hsts_check, 'status':i.status,'statusinfo':i.statusinfo,'notify_rule_name':ntrule[0].name
                        }) 
            
        return HttpResponse(json.dumps({'result':True,'data':res})) 
    except Exception,e:
        print e
        return HttpResponse(json.dumps({'result':False,'data':str(e)}))
    
    
def getcerts(request):
    userid=1  
    try:
        res = []
        data = sql('select project_certinfo.* from project_project,project_checkresult,project_certinfo where \
project_project.user_id='+str(userid)+' and project_project.id=project_checkresult.project_id \
and project_checkresult.certinfo_id = project_certinfo.id group by project_certinfo.id;')
         
        for i in data:
            expdate=i[12]-time.time()
            if expdate< 0:
                expdate=0
            else:
                expdate = int(expdate/(60*60*24)+0.5)
                
            tmp={'id':i[0],'sha1_fingerprint':i[1],'common_name':i[2],
             'issuer_name':i[3],'issuer_orgname':i[4],'serial_number':i[5],
             'signature_algorithm':i[6],'publicKeyAlgorithm':i[7],'publicKeySize':i[8],
             'chain_order_valid':i[9],'ocsp_trusted':i[10],'notBefore':time.strftime('%Y.%m.%d',time.localtime(i[11])),
             'notAfter':time.strftime('%Y.%m.%d',time.localtime(i[12])),'expdate':expdate,'trusted':i[13]
             }
            res.append(tmp)
        return HttpResponse(json.dumps({'result':True,'data':res})) 
    except Exception,e:
        print e
        return HttpResponse(json.dumps({'result':False,'data':str(e)}))
    
    
# check request 
def requestfromnode(request):
    clientip =None
    try:
        if 'HTTP_X_FORWARDED_FOR' in request.META:
            ip =  request.META['HTTP_X_FORWARDED_FOR']  
        else:  
            ip = request.META['REMOTE_ADDR']  
            
        nodes=distribute_server.objects.filter(address=ip);
        
        for i in nodes:
            clientip = i.address
            break
         
        if clientip:
            return True
        
        return False
    except Exception,e:
        print  'requestfrommaster:'+str(e)
        return False
    return False


@csrf_exempt
def createproject(request):
    userid=1  
    cpath = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    try: 
        data = json.loads(request.body)
        extchk =  data['extern_check'].split(';')
        chk={'ccs':False,'hsts':False,'heartbleed':False,'poodle':False}
 
        for i in extchk: 
            if len(i)>1:
                if not chk.has_key(i):
                    return HttpResponse(json.dumps({'result':False,'info':'extern_check data invalid'})) 
                
                chk[i] = True
        #TODO check args
        
        domains = data['domain'].split(';')
        name = data['name']
        frequency = data['frequency']
        notify_id = int(data['notify_id'])
        port = int(data['port'])
        
        for d in domains:
            exdomain=project.objects.filter(user_id=userid,domain=d)
            if len(exdomain)>0:
                return HttpResponse(json.dumps({'result':False,'info':'domain '+d+' existed'})) 
            
        for d in domains:
            tmp = project(user_id=userid,name=name,port=port,domain=d,
                          check_frequency=frequency,
                          notify_rule_id=notify_id,
                          create_time=time.time(),
                          heartbleed_check=chk['heartbleed'],
                          ccs_check=chk['ccs'],
                          hsts_check=chk['hsts'],
                          poodle_check=chk['poodle'],
                          status=0)
            tmp.save();
            cmd = 'python '+cpath+'/uploadproject.py -i '+str(tmp.id) +'&'
            os.system(cmd)
                
        return HttpResponse(json.dumps({'result':True,'info':''})) 
    except Exception,e:
        print e
        return HttpResponse(json.dumps({'result':False,'info':'createproject'+str(e)})) 

def delproject(request):
    userid=1  
    cpath = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    try: 
        pid = request.GET['id']
        pjt=project.objects.filter(user_id=userid,id=pid)
        
        if len(pjt) == 0:
            return HttpResponse(json.dumps({'result':False,'info':u'无法删除此项目'})) 
        
        chkres=checkresult.objects.filter(project_id=pid)
        
        distservers = distribute_server.objects.all()
        
        for s in distservers: 
            f = urllib.urlopen('http://'+s.address+':'+str(s.port)+'/sslcheck/delchecktask?id='+str(pid))
            print f.read()
        
        for i in chkres:
            i.delete()
        pjt.delete()
        
       
        return HttpResponse(json.dumps({'result':True,'info':'ok'}))  
    except Exception,e:
        print e
        return HttpResponse(json.dumps({'result':False,'info':'delproject'+str(e)})) 


#######################upload check result functions  start######################
#check cert trusted
def checktrusted(data):
    try:
        for i in data:
            if i['is_certificate_trusted'] == False:
                return False
        return True
    except:
        return False

GMT_FORMAT = '%b %d %H:%M:%S %Y GMT'
def updatabasic(acceptdata,chkres):
    #print acceptdata
    certinfo_basic=acceptdata['commands_results']['certinfo_basic']
    
    chain_order_valid=certinfo_basic['is_certificate_chain_order_valid']
    ocsp_trusted =certinfo_basic['is_ocsp_response_trusted']
    trusted=checktrusted(certinfo_basic['path_validation_result_list'])
    
    chkres.hostname_validation =certinfo_basic['is_ocsp_response_trusted']
    
    certmain = certinfo_basic['certificate_chain'][0]
    
    sha1_fingerprint=certmain['sha1_fingerprint']
    certmain = certmain['as_dict']
    common_name = certmain['subject']['commonName']
    
    issuer_name=certmain['issuer']['commonName']
    if certmain['issuer'].has_key('organizationName'):
        issuer_orgname =certmain['issuer']['organizationName']
    else:
        issuer_orgname ='unknow'
        
    serial_number=certmain['serialNumber']
    signature_algorithm=certmain['signatureAlgorithm']
    publicKeyAlgorithm=certmain['subjectPublicKeyInfo']['publicKeyAlgorithm']
    publicKeySize=certmain['subjectPublicKeyInfo']['publicKeySize']
    
    
    
    notBefore= time.mktime(datetime.datetime.strptime(certmain['validity']['notBefore'],GMT_FORMAT).timetuple())
    notAfter= time.mktime(datetime.datetime.strptime(certmain['validity']['notAfter'],GMT_FORMAT).timetuple())
    
    
    certinfos= certinfo.objects.filter(sha1_fingerprint=sha1_fingerprint)
    if len(certinfos) ==0:
        certd = certinfo(sha1_fingerprint=sha1_fingerprint,
                             common_name=common_name,
                             issuer_name=issuer_name,
                             issuer_orgname=issuer_orgname,
                             serial_number=serial_number,
                             signature_algorithm=signature_algorithm,
                             publicKeyAlgorithm=publicKeyAlgorithm,
                             publicKeySize=publicKeySize,
                             chain_order_valid=chain_order_valid,
                             ocsp_trusted=ocsp_trusted,
                             notBefore=notBefore,
                             notAfter=notAfter,
                             trusted=trusted
                             )
        certd.save()
    else:
        certd = certinfos[0]
        certd.sha1_fingerprint=sha1_fingerprint
        certd.common_name=common_name
        certd.issuer_name=issuer_name
        certd.issuer_orgname=issuer_orgname
        certd.serial_number=serial_number
        certd.signature_algorithm=signature_algorithm
        certd.publicKeyAlgorithm=publicKeyAlgorithm
        certd.publicKeySize=publicKeySize
        certd.chain_order_valid=chain_order_valid
        certd.ocsp_trusted=ocsp_trusted
        certd.notBefore=notBefore
        certd.notAfter=notAfter
        certd.trusted=trusted
        certd.save()
  #  return certd.id
    chkres.certinfo_id = certd.id

def updataccs(acceptdata):
    ccs=acceptdata['commands_results']['openssl_ccs']
    try:
        if ccs['is_vulnerable_to_ccs_injection']:
            return 2
    except:
        return 1
    return 1
    
def updatahsts(acceptdata):
    hsts=acceptdata['commands_results']['hsts']
    try:
        if  hsts['hsts_header']:
            return 1
    except:
        return 1
    return 2
    
def updataheartbleed(acceptdata):
    heartbleed=acceptdata['commands_results']['heartbleed']
    try:
        if heartbleed['is_vulnerable_to_heartbleed']:
            return 2
    except:
        
        print 'heartbleed check error:'+str(heartbleed)
        return 1
    return 1

def updatapoodle(acceptdata):
    heartbleed=acceptdata['commands_results']['poodle']
    try:
        if heartbleed['is_vulnerable']:
            return 2
    except:
        
        print 'poodle check error:'+str(heartbleed)
        return 1
    return 1


def sendmailbase(receivers,message,subject):
    print message,receivers,subject
    try:
        setting = server_setting.objects.filter()[0]
        
        sender = setting.emailsender
        cc_list =[]  
        
        msg = MIMEMultipart('alternative')
       # msg.set_charset('utf-8')
        timestr=time.strftime("%Y-%m-%d", time.localtime(time.time()))
        
        msg['Subject'] = subject
        msg['From'] = sender
        msg['To'] = COMMASPACE.join(receivers)
        msg['CC'] = COMMASPACE.join(cc_list)
     
        msg.attach(MIMEText(message, 'html', 'utf-8'))
        s = SMTP(setting.emailsmtp)
        s.sendmail(sender, receivers, msg.as_string())
        s.quit()    
    except Exception,e: 
        print e
        return False
    
def sendalertmail(prj,notifyrule):
    if prj.status>2 :
        tts = int(time.time()) - notifyrule.repeat_interval*60*60
        
        logs = alertlog.objects.filter(project_id=prj.id,statusinfo=prj.statusinfo,timestamp__gt=tts)
        if len(logs) > 0:
            return
        
        log = alertlog(project_id=prj.id,statusinfo=prj.statusinfo,timestamp=int(time.time()))
        log.save()  
        message =u'<br>监控的域名%s检测到异常:</br>'%prj.domain
        statusinfo = prj.statusinfo.split(';')
        for i in statusinfo:
            message +=u'<br>%s</br>'%i
        message +=u'<br><a href="http://127.0.0.1:8000/project/report?id=%s">查看异常监控项目</a></br>'%str(prj.id)
        sendmailbase([notifyrule.email],message,u'HTTPS监控报警')
    return


def updateprojectstatus(projectid,chkres):
    try:
        alertmsg = []
        prj = project.objects.filter(id=projectid)
        prj=prj[0]
        notify=notify_rule.objects.filter(id=prj.notify_rule_id)
        notify=notify[0]
        certinfos= certinfo.objects.filter(id=chkres.certinfo_id)
        crt=certinfos[0]
        
        prj.status=2
        
        expdate=crt.notAfter-time.time()
        if expdate< 0:
            prj.status=5
            chkres.statuslevel=2
            alertmsg.append(u'已过期')
        else:
            expdate = int(expdate/(60*60*24)+0.5)
            if expdate < notify.expire_alert_day:
                prj.status=3
                chkres.statuslevel=1
                alertmsg.append(u'即将过期')
        if not chkres.hostname_validation:
            prj.status=4
            chkres.statuslevel=2
            alertmsg.append(u'证书不匹配')
            
        if not crt.trusted:  
            if prj.status<3:
                prj.status=4
                chkres.statuslevel=2
            alertmsg.append(u'证书不被信任')
            
        if cmp(crt.signature_algorithm,'sha256WithRSAEncryption'):
            if prj.status<3:
                prj.status=3
                chkres.statuslevel=1
            alertmsg.append(u'签名算法不安全')
        if chkres.ccs==2:
            if prj.status<3:
                prj.status=3
                chkres.statuslevel=1
            alertmsg.append(u'存在CCS漏洞')
        if chkres.hstc==2:
            if prj.status<3:
                prj.status=3
                chkres.statuslevel=1
            alertmsg.append(u'HSTS未设置')
        if chkres.heartbleed==2:  
            if prj.status<3:
                prj.status=3
                chkres.statuslevel=1
            alertmsg.append(u'存在heartbleed漏洞')
        if chkres.poodle==2:  
            if prj.status<3:
                prj.status=3
                chkres.statuslevel=1
            alertmsg.append(u'存在POODLE漏洞风险')

       # chkres.statusinfo=';'.join(alertmsg)
        prj.statusinfo=';'.join(alertmsg)
       # print prj.statusinfo
        chkres.save()
        prj.save()
        sendalertmail(prj,notify)
    except  Exception,e:
        print 'updateprojectstatus except'
        print e
        return

@csrf_exempt
def uploadcheckresult(request):
    #print request
    try: 
        if not requestfromnode(request):
            return HttpResponse(json.dumps({'result':False,'info':'permission deny'})) 
        rawjson = json.loads(json.dumps(request.POST))
        
        projectid = int(rawjson['project_id'])
 
        data=json.loads(rawjson['data'])

        if len(data['accepted_targets']) == 0:
            #TODO record invalid result
            errinfo=None
            for key in data['invalid_targets'][0]:
                errinfo =  data['invalid_targets'][0][key]
            prj = project.objects.filter(id=projectid)
            prj=prj[0]
            prj.status=4
            prj.statusinfo=errinfo
            prj.save()
            return HttpResponse(json.dumps({'result':True,'info':''})) 
        
        acceptdata = data['accepted_targets'][0]

        domain_ip = acceptdata['server_info']['ip_address']
        
        resd = checkresult.objects.filter(project_id=projectid,ip=domain_ip)
        chkres = None
        if len(resd) == 0:
            chkres= checkresult(project_id=projectid,ip=domain_ip)
            chkres.statuslevel=0
        else:
            chkres = resd[0]
            
    
        if acceptdata['commands_results'].has_key('certinfo_basic'):
            updatabasic(acceptdata,chkres)
        if  acceptdata['commands_results'].has_key('openssl_ccs'):
            chkres.ccs =updataccs(acceptdata)
        if  acceptdata['commands_results'].has_key('hsts'):
            chkres.hstc =updatahsts(acceptdata)
        if  acceptdata['commands_results'].has_key('heartbleed'):
            chkres.heartbleed =updataheartbleed(acceptdata)
        if  acceptdata['commands_results'].has_key('poodle'):
            chkres.poodle =updatapoodle(acceptdata)
            
        chkres.lastcheckts = int(time.time())
        chkres.save()    
        
        updateprojectstatus(projectid,chkres)
        
        return HttpResponse(json.dumps({'result':True,'info':''})) 
    except Exception,e:
        print e
        return HttpResponse(json.dumps({'result':False,'info':'uploadcheckresult'+str(e)})) 
 