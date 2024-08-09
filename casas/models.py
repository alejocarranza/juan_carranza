from django.db import models
from jsonfield import JSONField

# Create your models here.

class Barrio(models.Model):
    nombre= models.CharField(max_length= 70)
    imagen= models.ImageField(upload_to= "barrios/imagenes")
    direccion= models.CharField(max_length=100)
    privado= models.BooleanField(default= "True")
    slug= models.SlugField(max_length=70)
    titulo= models.TextField(max_length=120)
    descripcion= models.TextField(max_length=500)
    created= models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name= "barrio"
        verbose_name_plural= "barrios"

    def __str__(self):
        return self.nombre

class Imagen(models.Model):
    imagen= models.ImageField(upload_to= "casas/imagenes/")
    opciones= (
        ("exteriores", "exteriores"),
        ("interiores", "interiores"),
        ("planos", "planos"),
    )
    opcion= models.CharField(max_length= 15, choices= opciones, default= "exteriores")
    slug= models.SlugField(max_length=50)

    class Meta:
        verbose_name= "imagen"
        verbose_name_plural= "imagenes"

    def __str__(self):
        return str(self.slug)

class TipoPropiedad(models.Model):
    nombre= models.CharField(max_length= 40)
    slug= models.SlugField(max_length=50)

    class Meta:
        verbose_name= "Tipo de propiedad"
        verbose_name_plural= "Tipos de propiedades"

    def __str__(self):
        return str(self.nombre)

class TipoOperacion(models.Model):
    nombre= models.CharField(max_length= 40)
    slug= models.SlugField(max_length=50)

    class Meta:
        verbose_name= "Tipo de operación"
        verbose_name_plural= "Tipos de operaciones"

    def __str__(self):
        return str(self.nombre)

class Casa(models.Model):
    nombre= models.CharField(max_length=80)
    descripcion= models.TextField(verbose_name= "Descripción acotada de la casa", max_length=120)
    direccion= models.ForeignKey(Barrio, on_delete=models.CASCADE)
    slug= models.SlugField(max_length=100)
    lote= models.IntegerField(null=True, blank=True)
    manzana= models.IntegerField(null=True, blank=True)
    calle= models.CharField(max_length= 80, blank= True, null= True)
    altura= models.PositiveIntegerField(blank= True, null= True)
    codigo_postal= models.PositiveIntegerField(blank= True, null= True)
    imagen_principal= models.ImageField(verbose_name= "Imágen principal con dimensiones 4x3 (ancho x alto)", upload_to="casas/imagenes/principales")
    imagen_principal1= models.ImageField(verbose_name= "Imágen principal con dimensiones 16x9 (ancho x alto)", upload_to="casas/imagenes/secundaria")
    imagen_principal2= models.ImageField(verbose_name= "Imágen principal con dimensiones 3x4 (ancho x alto)", upload_to="casas/imagenes/terciaria")
    imagenes= models.ManyToManyField(Imagen)
    informacion= JSONField(verbose_name="Información adicional")

    sup_terreno= models.PositiveIntegerField(verbose_name= "Superficie del terreno")
    sup_cubierta= models.PositiveIntegerField(verbose_name= "Superficie cubierta")
    dormitorios= models.PositiveSmallIntegerField()
    baños= models.PositiveSmallIntegerField()
    ambientes= models.PositiveSmallIntegerField()
    precio= models.PositiveIntegerField(verbose_name="Precio en dolares de la casa")
    video= models.CharField(verbose_name="Url del video de youtube de la casa", max_length=100)

    tipo_propiedad= models.ForeignKey(TipoPropiedad, on_delete=models.CASCADE)
    tipo_operacion= models.ForeignKey(TipoOperacion, on_delete=models.CASCADE)

    created= models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name= "casa"
        verbose_name_plural= "casas"

    def __str__(self):
        return str(self.slug)