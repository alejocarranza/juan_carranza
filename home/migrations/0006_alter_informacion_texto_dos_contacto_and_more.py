# Generated by Django 5.0.7 on 2024-07-22 22:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0005_informacion_texto_dos_contacto_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='informacion',
            name='texto_dos_contacto',
            field=models.TextField(max_length=120, verbose_name='Texto del segundo paso de contacto del home'),
        ),
        migrations.AlterField(
            model_name='informacion',
            name='texto_tres_contacto',
            field=models.TextField(max_length=120, verbose_name='Texto del tercer paso de contacto del home'),
        ),
        migrations.AlterField(
            model_name='informacion',
            name='texto_uno_contacto',
            field=models.TextField(max_length=120, verbose_name='Texto del primer paso de contacto del home'),
        ),
    ]
