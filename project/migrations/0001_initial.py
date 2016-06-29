# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='certinfo',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('sha1_fingerprint', models.CharField(max_length=50)),
                ('common_name', models.CharField(max_length=18)),
                ('issuer_name', models.CharField(max_length=256)),
                ('issuer_orgname', models.CharField(max_length=256)),
                ('serial_number', models.CharField(max_length=256)),
                ('signature_algorithm', models.CharField(max_length=50)),
                ('publicKeyAlgorithm', models.CharField(max_length=50)),
                ('publicKeySize', models.CharField(max_length=20)),
                ('chain_order_valid', models.BooleanField()),
                ('ocsp_trusted', models.BooleanField()),
                ('notBefore', models.IntegerField()),
                ('notAfter', models.IntegerField()),
                ('trusted', models.BooleanField()),
            ],
        ),
        migrations.CreateModel(
            name='checkresult',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('project_id', models.IntegerField()),
                ('ip', models.CharField(max_length=18)),
                ('lastcheckts', models.IntegerField()),
                ('statuslevel', models.CharField(max_length=18)),
                ('statusinfo', models.CharField(max_length=100)),
                ('heartbleed', models.IntegerField()),
                ('ccs', models.IntegerField()),
                ('hstc', models.IntegerField()),
                ('certinfo_id', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='project',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('user_id', models.IntegerField()),
                ('name', models.CharField(max_length=80)),
                ('port', models.IntegerField()),
                ('domain', models.CharField(max_length=80)),
                ('check_frequency', models.IntegerField()),
                ('notify_rule_id', models.IntegerField()),
                ('create_time', models.CharField(max_length=30)),
                ('heartbleed_check', models.BooleanField(default=False)),
                ('ccs_check', models.BooleanField(default=False)),
                ('hstc_check', models.BooleanField(default=False)),
                ('status', models.IntegerField()),
            ],
        ),
    ]
