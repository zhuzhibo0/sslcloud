# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sslcheck', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='checktask',
            name='frequency',
            field=models.IntegerField(default=5),
            preserve_default=False,
        ),
    ]
