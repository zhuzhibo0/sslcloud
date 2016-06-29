# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('setting', '0002_auto_20160518_1654'),
    ]

    operations = [
        migrations.AddField(
            model_name='notify_rule',
            name='name',
            field=models.CharField(default=123, max_length=80),
            preserve_default=False,
        ),
    ]
