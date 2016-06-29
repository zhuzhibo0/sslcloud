from django.contrib import admin
from project.models import project,checkresult,certinfo,alertlog

# Register your models here.
class projectAdmin(admin.ModelAdmin):
    list_display = [ 'user_id', 'name', 'port','domain','check_frequency','notify_rule_id','create_time','heartbleed_check','ccs_check','hsts_check','status']
    search_fields =  [ 'project_id', 'domain']   
    
class checkresultAdmin(admin.ModelAdmin):
    list_display = [ 'project_id', 'ip', 'lastcheckts','statuslevel','statusinfo','heartbleed','ccs','hstc','certinfo_id']
    search_fields =  [ 'project_id', 'ip']   
    
class certinfoAdmin(admin.ModelAdmin):
    list_display = [ 'sha1_fingerprint', 'common_name', 'issuer_name','issuer_orgname','serial_number',
                    'signature_algorithm','publicKeyAlgorithm','publicKeySize','chain_order_valid',
                    'ocsp_trusted','notBefore','notAfter','trusted']
    search_fields =  [ 'sha1_fingerprint', 'common_name']   
class alertlogAdmin(admin.ModelAdmin):
    list_display = [ 'project_id', 'statusinfo', 'timestamp']
    search_fields =  [ 'project_id', 'statusinfo', 'timestamp']   
 
    
    
admin.site.register(project, projectAdmin)
admin.site.register(checkresult, checkresultAdmin)
admin.site.register(certinfo, certinfoAdmin)
admin.site.register(alertlog, alertlogAdmin)