# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='distribute_server',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('address', models.CharField(max_length=80)),
                ('port', models.IntegerField(default=80)),
            ],
        ),
        migrations.CreateModel(
            name='global_setting',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('master_address', models.CharField(max_length=80)),
                ('port', models.IntegerField(default=80)),
            ],
        ),
        migrations.CreateModel(
            name='notify_rule',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('user_id', models.IntegerField()),
                ('email', models.CharField(max_length=80)),
                ('notify_threshold', models.IntegerField()),
                ('repeat_interval', models.IntegerField()),
                ('expire_alert_day', models.IntegerField()),
            ],
        ),
    ]
