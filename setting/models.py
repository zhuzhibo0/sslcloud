# encoding:utf-8

from django.db import models

# Create your models here.

class notify_rule(models.Model):
    user_id = models.IntegerField() 
    name = models.CharField(max_length=80)
    email = models.CharField(max_length=80)
    notify_threshold = models.IntegerField(default=1) #连续几次失败后通知   暂时不用
    repeat_interval= models.IntegerField()   #相同状态不重复通知
    expire_alert_day = models.IntegerField() # cert expire alert befor x days(  one time per day)


class server_setting(models.Model):
    master_address = models.CharField(max_length=80) 
    port=models.IntegerField(default=80)
    emailsender=models.CharField(max_length=80)
    emailsmtp=models.CharField(max_length=80)

class distribute_server(models.Model):
    address = models.CharField(max_length=80) 
    port=models.IntegerField(default=80)










    