from django.db import models

# Create your models here.

class Barrio(models.Model):
    nombre= models.CharField(max_length= 80)
    direccion= models.CharField(max_length=200)
    privado= models.BooleanField(default= "True")
    slug= models.SlugField(max_length=150)
    created= models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name= "barrio"
        verbose_name_plural= "barrios"

    def __str__(self):
        return self.nombre


class Imagen(models.Model):
    imagen= models.ImageField(upload_to= "casas/imagenes/")
    slug= models.SlugField(max_length=150)

    class Meta:
        verbose_name= "imagen"
        verbose_name_plural= "imagenes"

    def __str__(self):
        return str(self.slug)

class Casa(models.Model):
    nombre= models.CharField(max_length=150)
    direccion= models.ForeignKey(Barrio, on_delete=models.CASCADE)
    slug= models.SlugField(max_length=150)
    lote= models.IntegerField(null=True, blank=True)
    manzana= models.IntegerField(null=True, blank=True)
    imagenes= models.ManyToManyField(Imagen)

    descripcion_corta= models.TextField(max_length=1000)
    descripcion_larga= models.TextField(max_length=4000)

    created= models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name= "casa"
        verbose_name_plural= "casas"

    def __str__(self):
        return str(self.slug)