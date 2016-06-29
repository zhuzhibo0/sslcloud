from django.contrib import admin
from sslcheck.models import checktask

# Register your models here.
class checktaskAdmin(admin.ModelAdmin):
    list_display = [ 'project_id', 'domain', 'module','frequency']
    search_fields =  [ 'project_id', 'domain']   
#admin.site.register(Task, TaskAdmin)
admin.site.register(checktask, checktaskAdmin)