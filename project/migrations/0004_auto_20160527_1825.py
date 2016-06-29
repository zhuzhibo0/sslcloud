# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0003_auto_20160524_1602'),
    ]

    operations = [
        migrations.AlterField(
            model_name='certinfo',
            name='common_name',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='certinfo',
            name='publicKeySize',
            field=models.CharField(max_length=40),
        ),
        migrations.AlterField(
            model_name='checkresult',
            name='statuslevel',
            field=models.CharField(max_length=50, blank=True),
        ),
    ]
