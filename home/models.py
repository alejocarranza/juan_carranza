from django.db import models
from jsonfield import JSONField

# Create your models here.

class Informacion(models.Model):
    # Info general
    nombre= models.CharField(verbose_name="Nombre de la inmobiliaria", max_length= 70)
    descripcion= models.TextField(verbose_name="Descrpción breve de la inmobiliaria" , max_length=300)

    # Medio de contacto
    numero= models.PositiveIntegerField(verbose_name="Numero de telefono para contactarse con la inmobiliaria")
    mail= models.EmailField(verbose_name="Email para contactarse con la inmobiliaria")
    ig= models.CharField(verbose_name="Instagram de la inmobiliaria", max_length=30)
    medio_contacto= JSONField(verbose_name= "Medio de contacto extra", blank= True, null= True)

    # Página nosotros
    titulo= models.TextField(verbose_name= "Titulo de texto de la pagina nosotros", max_length=140)
    texto= models.TextField(verbose_name= "Texto de la pagina nosotros", max_length=500)

    imagen1= models.ImageField(verbose_name="Imágen del texto ubicado a la izquierda de la segunda sección de la página nosotros", upload_to= "nosotros/seccion2/imagenes")
    subtitulo1= models.CharField(verbose_name="Subtitulo del texto ubicado a la izquierda de la segunda sección de la página nosotros", max_length= 40)
    titulo1= models.CharField(verbose_name="Título del texto ubicado a la izquierda de la segunda sección de la página nosotros", max_length= 30)
    texto1= models.CharField(verbose_name="Texto ubicado a la izquierda de la segunda sección de la página nosotros", max_length= 250)

    imagen2= models.ImageField(verbose_name="Imágen del texto ubicado a la derecha de la segunda sección de la página nosotros", upload_to= "nosotros/seccion2/imagenes")
    subtitulo2= models.CharField(verbose_name="Subtitulo del texto ubicado a la derecha de la segunda sección de la página nosotros", max_length= 40)
    titulo2= models.CharField(verbose_name="Título del texto ubicado a la derecha de la segunda sección de la página nosotros", max_length= 30)
    texto2= models.CharField(verbose_name="Texto ubicado a la derecha de la segunda sección de la página nosotros", max_length= 250)

    # FALTA AGREGAR UNA PARTE DE LA PÁGINA NOSOTROS

    class Meta:
        verbose_name= "Información general"

    def __str__(self):
        return self.nombre