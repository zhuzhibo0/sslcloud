# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0004_auto_20160527_1825'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='statusinfo',
            field=models.CharField(max_length=256, blank=True),
        ),
    ]
