# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('setting', '0004_auto_20160606_1726'),
    ]

    operations = [
        migrations.AddField(
            model_name='server_setting',
            name='emailsender',
            field=models.IntegerField(default=80),
        ),
        migrations.AddField(
            model_name='server_setting',
            name='emailsmtp',
            field=models.IntegerField(default=80),
        ),
    ]
