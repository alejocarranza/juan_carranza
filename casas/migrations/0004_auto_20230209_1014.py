# Generated by Django 3.2.1 on 2023-02-09 13:14

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('casas', '0003_auto_20230208_1501'),
    ]

    operations = [
        migrations.AddField(
            model_name='barrio',
            name='created',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='casa',
            name='created',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='casa',
            name='descripcion_corta',
            field=models.TextField(default=django.utils.timezone.now, max_length=1000),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='casa',
            name='descripcion_larga',
            field=models.TextField(default=django.utils.timezone.now, max_length=4000),
            preserve_default=False,
        ),
    ]
