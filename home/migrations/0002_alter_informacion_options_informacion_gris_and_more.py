# Generated by Django 5.0.7 on 2024-07-22 22:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='informacion',
            options={'verbose_name': 'Información general', 'verbose_name_plural': 'Información general'},
        ),
        migrations.AddField(
            model_name='informacion',
            name='gris',
            field=models.CharField(default='jjfdjkfd', max_length=50, verbose_name='Titulo en gris de la página de home'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='informacion',
            name='home_text',
            field=models.TextField(default='kfo', max_length=200, verbose_name='Texto principal de la página de home'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='informacion',
            name='negrito',
            field=models.CharField(default='kof', max_length=40, verbose_name='Titulo en negrito de la página de home'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='informacion',
            name='texto1',
            field=models.TextField(max_length=250, verbose_name='Texto ubicado a la izquierda de la segunda sección de la página nosotros'),
        ),
        migrations.AlterField(
            model_name='informacion',
            name='texto2',
            field=models.TextField(max_length=250, verbose_name='Texto ubicado a la derecha de la segunda sección de la página nosotros'),
        ),
        migrations.AlterField(
            model_name='informacion',
            name='titulo1',
            field=models.TextField(max_length=30, verbose_name='Título del texto ubicado a la izquierda de la segunda sección de la página nosotros'),
        ),
        migrations.AlterField(
            model_name='informacion',
            name='titulo2',
            field=models.TextField(max_length=30, verbose_name='Título del texto ubicado a la derecha de la segunda sección de la página nosotros'),
        ),
    ]
