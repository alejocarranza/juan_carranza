from django.db import models

# Create your models here.

class Barrio(models.Model):
    nombre= models.CharField(max_length= 80)
    direccion= models.CharField(max_length=200)
    privado= models.BooleanField(default= "True")


class Casa(models.Model):
    direccion= models.ForeignKey(Barrio, on_delete=models.CASCADE)
    lote= models.IntegerField(null=True, blank=True)
    manzana= models.IntegerField(null=True, blank=True)


    cantidadImagenes= models.IntegerField(default= 1)
    imagenes= []
    for i in self.cantidadImagenes():
        imagenes[i]= models.ImageField()