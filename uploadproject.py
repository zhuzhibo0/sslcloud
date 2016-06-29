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
from project.models import project
from setting.models import distribute_server

def getHttp(url,getdata):    
    params = urllib.urlencode(getdata)
    f = urllib.urlopen(url % params)
    return f.read()
  

def make_parser():

    parser = argparse.ArgumentParser()
    parser.add_argument('-i', '--pid', help='pid 1', dest='pid') 
    return parser
def valid_args(args):
    try:
       id = int(args.pid) 
       return True
    except:
        return False

def main(): 
    parser = make_parser()
    args = parser.parse_args()
    if not valid_args(args):
        parser.print_help()
        return
    p = project.objects.filter(id=int(args.pid))
    if len(p) == 0:
        print 'can not find project id:'+str(args.pid)
        return
    distservers = distribute_server.objects.all()
    
    modules = 'basic'
    if p[0].heartbleed_check:
        modules+=',heartbleed'
    if p[0].ccs_check:
        modules+=',ccs'
    if p[0].hsts_check:
        modules+=',hsts'
    if p[0].poodle_check:
        modules+=',poodle'
        
    print modules
    getdata={'domain':p[0].domain,'project_id':p[0].id,'frequency':p[0].check_frequency,'module':modules}
    for s in distservers:
        server = 'http://'+s.address+':'+str(s.port)+'/sslcheck/checkdomain?%s'
        #TODO 检测发送失败的情况
        print getHttp(server,getdata)
    p[0].status=1
    p[0].save()
if __name__ == '__main__':
    main()