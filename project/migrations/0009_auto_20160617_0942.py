# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0008_alertlog'),
    ]

    operations = [
        migrations.AddField(
            model_name='checkresult',
            name='poodle',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='project',
            name='poodle_check',
            field=models.BooleanField(default=False),
        ),
    ]
