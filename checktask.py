#!/usr/bin/env python
# encoding:utf-8

'''
Created on 2016��5��17��

@author: zhuzb
'''
import urllib2
import urllib
import sys
import argparse
import django
import logging
import requests
import json 
import os
import time
os.environ.setdefault('DJANGO_SETTINGS_MODULE','sslcloud.settings')
 
import django
django.setup()
from sslcheck.models import checktask
from setting.models import server_setting

def main():
    glbcfg=server_setting.objects.all();
    
    for i in glbcfg:
        master = i.master_address+':'+str(i.port)
        break
        
    while(1):
        time.sleep(1)
        alltask =checktask.objects.all()
        print '#'
        for i in alltask:
            curtime = time.time()
            if curtime - i.lastcheck > i.frequency*60:
                cmd= os.path.dirname(os.path.dirname(os.path.abspath(__file__)))+'/src/checkasync.py '
                cmd+=' -m '+i.module  + ' -d '+i.domain
                cmd+=' -s '+master
                cmd+=' -i '+str(i.project_id)
                print 'python '+cmd + '&'
                os.system('python '+cmd + '&')#.read()
               # i.lastcheck=curtime
               # i.save()

if __name__ == '__main__':
    main()