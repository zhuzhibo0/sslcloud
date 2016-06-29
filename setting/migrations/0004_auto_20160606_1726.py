# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('setting', '0003_notify_rule_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='notify_rule',
            name='notify_threshold',
            field=models.IntegerField(default=1),
        ),
    ]
