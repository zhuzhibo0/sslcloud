# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0007_auto_20160608_1509'),
    ]

    operations = [
        migrations.CreateModel(
            name='alertlog',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('project_id', models.IntegerField()),
                ('statusinfo', models.CharField(max_length=512, blank=True)),
                ('timestamp', models.IntegerField()),
            ],
        ),
    ]
