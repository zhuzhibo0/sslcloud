from django.db import models

# Create your models here.


class checktask (models.Model):
    project_id = models.IntegerField()
    domain = models.CharField(max_length=100) 
    module= models.CharField(max_length=100) 
    frequency = models.IntegerField()
    lastcheck = models.IntegerField(default=0)
