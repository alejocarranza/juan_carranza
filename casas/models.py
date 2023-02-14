from django.db import models

# Create your models here.

class Barrio(models.Model):
    nombre= models.CharField(max_length= 50)
    direccion= models.CharField(max_length=100)
    privado= models.BooleanField(default= "True")
    slug= models.SlugField(max_length=150)
    descripcion_corta= models.TextField(max_length=100)
    descripcion_larga= models.TextField(max_length=300)
    created= models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name= "barrio"
        verbose_name_plural= "barrios"

    def __str__(self):
        return self.nombre


class Imagen(models.Model):
    imagen= models.ImageField(upload_to= "casas/imagenes/")
    opciones= (
        ("principal", "principal"),
        ("avance_de_obra", "avance_de_obra"),
        ("exteriores", "exteriores"),
        ("interiores", "interiores"),
        ("planos", "planos"),
    )
    opcion= models.CharField(max_length= 15, choices= opciones, default= "exteriores")
    slug= models.SlugField(max_length=150)

    class Meta:
        verbose_name= "imagen"
        verbose_name_plural= "imagenes"

    def __str__(self):
        return str(self.slug)

class Casa(models.Model):
    nombre= models.CharField(max_length=800)
    direccion= models.ForeignKey(Barrio, on_delete=models.CASCADE)
    slug= models.SlugField(max_length=150)
    lote= models.IntegerField(null=True, blank=True)
    manzana= models.IntegerField(null=True, blank=True)
    imagenes= models.ManyToManyField(Imagen)

    descripcion_corta= models.TextField(max_length=100)
    descripcion_larga= models.TextField(max_length=300)

    created= models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name= "casa"
        verbose_name_plural= "casas"

    def __str__(self):
        return str(self.slug)