# Generated by Django 5.0.7 on 2024-07-13 19:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('casas', '0017_alter_barrio_nombre_alter_barrio_slug_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='barrio',
            name='descripcion',
            field=models.TextField(max_length=600),
        ),
    ]
