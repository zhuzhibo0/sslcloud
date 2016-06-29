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
os.environ.setdefault('DJANGO_SETTINGS_MODULE','sslcloud.settings')
import django
django.setup()
from sslcheck.models import checktask


global sslyze_module  
sslyze_module = []

def postHttp(url,postdata):  
    #url编码
    postdata=urllib.urlencode(postdata)
    #enable cookie
    request = urllib2.Request(url,postdata)
    response=urllib2.urlopen(request)
    print response
  

def make_parser():

    parser = argparse.ArgumentParser()
    parser.add_argument('-d', '--domain', help='domain www.baidu.com', dest='domain')
    parser.add_argument('-s', '--server', help='server 127.0.0.1', dest='server') 
    parser.add_argument('-m', '--module', help='module basic/ccs/hsts/heartbleed', dest='module') 
    parser.add_argument('-i', '--projectid', help='projectid 1', dest='pid') 
    return parser


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

def valid_args(args):
    if args.domain == None or args.server == None or args.pid == None:
        return False

    if args.module == None:
        return False  
    global sslyze_module 
 
    sslyze_module = args.module.split(',')
    
    for i in sslyze_module:
        print i
        if not indefinemodule(i):
            return False 
    
    return True

 
def main():
    global sslyze_module
    parser = make_parser()
    args = parser.parse_args()
    import time 
    
    if not valid_args(args):
     
        parser.print_help()
        return
    
    task =checktask.objects.filter(project_id=args.pid)
    task=task[0]
    
    jsonfilename = args.domain+str(args.pid)+'.json'
    cmdarg = ''
    for mm in sslyze_module:
        cmdarg+=define_modules[mm]
        
    cmd = 'sslyze_cli.py '+cmdarg+args.domain +' --json_out '+'./'+jsonfilename
    print '############\n'+ cmd +'\n############\n'
    os.system(cmd)
    ff = open('./'+jsonfilename)
    
    data = {'domain':args.domain,'project_id':args.pid,'data':ff.read()}
    ##print data['data']
    ff.close() 
    os.remove('./'+jsonfilename) 
    postHttp('http://'+args.server+'/project/uploadcheckresult',data)
    
    
    task.lastcheck= time.time()
    task.save()

if __name__ == '__main__':
    main()