# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sslcheck', '0002_checktask_frequency'),
    ]

    operations = [
        migrations.AddField(
            model_name='checktask',
            name='lastcheck',
            field=models.IntegerField(default=0),
        ),
    ]
