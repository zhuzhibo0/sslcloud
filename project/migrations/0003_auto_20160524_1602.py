# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0002_auto_20160518_1654'),
    ]

    operations = [
        migrations.RenameField(
            model_name='project',
            old_name='hstc_check',
            new_name='hsts_check',
        ),
    ]
