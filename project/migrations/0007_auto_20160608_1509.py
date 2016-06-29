# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0006_auto_20160608_1503'),
    ]

    operations = [
        migrations.AlterField(
            model_name='checkresult',
            name='statusinfo',
            field=models.CharField(max_length=512, blank=True),
        ),
        migrations.AlterField(
            model_name='project',
            name='statusinfo',
            field=models.CharField(max_length=512, blank=True),
        ),
    ]
