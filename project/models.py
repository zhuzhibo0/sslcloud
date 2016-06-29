# encoding:utf-8
from django.db import models  

# Create your models here.
class project(models.Model):
    user_id = models.IntegerField()
    name = models.CharField(max_length=80)
    port = models.IntegerField()
    domain = models.CharField(max_length=80)
    check_frequency = models.IntegerField() # fenzhong
    notify_rule_id = models.IntegerField()
    create_time = models.CharField(max_length=30)
    heartbleed_check = models.BooleanField(default=False)
    ccs_check = models.BooleanField(default=False)
    hsts_check = models.BooleanField(default=False) 
    poodle_check = models.BooleanField(default=False) 
    status = models.IntegerField() # 0=wait for upload  1=wait for checking 2=normal 3=warning 4=error 5=expired
    statusinfo = models.CharField(max_length=512,blank=True)
#     notbefore_alert_day= models.IntegerField() 

class checkresult (models.Model):
    project_id = models.IntegerField()
    ip = models.CharField(max_length=18,blank=True) 
    lastcheckts=models.IntegerField(default=0)
    statuslevel=models.IntegerField(default=0) #0=normal 1=warning 2=error
    statusinfo=models.CharField(max_length=512,blank=True) 
    heartbleed = models.IntegerField(default=0) #0 not checked #1 no  #2yes has problem
    ccs = models.IntegerField(default=0)#0 not checked #1 no  #2yes has problem
    hstc = models.IntegerField(default=0)#0 not checked #1 no  #2yes has problem
    poodle = models.IntegerField(default=0)#0 not checked #1 no  #2yes has problem
    certinfo_id = models.IntegerField(default=-1) 
    hostname_validation = models.BooleanField(default=False)  #÷§ È «∑Ò∆•≈‰
     
class certinfo(models.Model): 
    sha1_fingerprint=models.CharField(max_length=50)
    common_name = models.CharField(max_length=50) 
    issuer_name=models.CharField(max_length=256)
    issuer_orgname =models.CharField(max_length=256)
    serial_number=models.CharField(max_length=256)
    signature_algorithm=models.CharField(max_length=50)
    publicKeyAlgorithm=models.CharField(max_length=50)
    publicKeySize=models.CharField(max_length=40)
    chain_order_valid=models.BooleanField() 
    ocsp_trusted = models.BooleanField() 
    notBefore=models.IntegerField()
    notAfter=models.IntegerField()
    trusted=models.BooleanField() #cert  is trusted or not

class alertlog (models.Model):
    project_id = models.IntegerField()
    statusinfo = models.CharField(max_length=512,blank=True)
    timestamp =  models.IntegerField()
    
def sql(sqlexe):
    from django.db import connection,transaction
    cursor = connection.cursor()  
    cursor.execute(sqlexe)
    raw=cursor.fetchall()
    return raw
    