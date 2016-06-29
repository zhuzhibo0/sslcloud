from django.contrib import admin
from setting.models import server_setting,distribute_server,notify_rule


# Register your models here.
# Create your models here.
class server_settingAdmin(admin.ModelAdmin):
    list_display = [ 'master_address', 'port','emailsender','emailsmtp']
    search_fields =  [ 'master_address', 'port','emailsender','emailsmtp']

class distribute_serverAdmin(admin.ModelAdmin):
    list_display = [ 'address', 'port']
    search_fields =  [ 'address', 'port']   
    
class notify_ruleAdmin(admin.ModelAdmin):
    list_display = [ 'user_id', 'name', 'email', 'notify_threshold', 'repeat_interval', 'expire_alert_day']
    search_fields =  [ 'user_id', 'name', 'email', 'notify_threshold', 'repeat_interval', 'expire_alert_day']   
    
#admin.site.register(Task, TaskAdmin)
admin.site.register(server_setting, server_settingAdmin)
admin.site.register(distribute_server, distribute_serverAdmin)
admin.site.register(notify_rule, notify_ruleAdmin)
