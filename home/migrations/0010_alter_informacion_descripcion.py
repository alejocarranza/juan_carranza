# Generated by Django 5.0.7 on 2024-07-23 15:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0009_alter_informacion_descripcion'),
    ]

    operations = [
        migrations.AlterField(
            model_name='informacion',
            name='descripcion',
            field=models.TextField(max_length=200, verbose_name='Descripción breve de la inmobiliaria'),
        ),
    ]
