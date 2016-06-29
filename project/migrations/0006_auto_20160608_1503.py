# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0005_project_statusinfo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='checkresult',
            name='statuslevel',
            field=models.IntegerField(default=0),
        ),
    ]
