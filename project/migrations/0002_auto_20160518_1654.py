# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='checkresult',
            name='ccs',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='checkresult',
            name='certinfo_id',
            field=models.IntegerField(default=-1),
        ),
        migrations.AlterField(
            model_name='checkresult',
            name='heartbleed',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='checkresult',
            name='hstc',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='checkresult',
            name='ip',
            field=models.CharField(max_length=18, blank=True),
        ),
        migrations.AlterField(
            model_name='checkresult',
            name='lastcheckts',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='checkresult',
            name='statusinfo',
            field=models.CharField(max_length=100, blank=True),
        ),
        migrations.AlterField(
            model_name='checkresult',
            name='statuslevel',
            field=models.CharField(max_length=18, blank=True),
        ),
    ]
