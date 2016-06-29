# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('setting', '0005_auto_20160621_1618'),
    ]

    operations = [
        migrations.AlterField(
            model_name='server_setting',
            name='emailsender',
            field=models.CharField(max_length=80),
        ),
        migrations.AlterField(
            model_name='server_setting',
            name='emailsmtp',
            field=models.CharField(max_length=80),
        ),
    ]
