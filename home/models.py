from django.db import models
from jsonfield import JSONField

# Create your models here.

class Informacion(models.Model):
    ID= models.AutoField(primary_key= True)
    # Info general
    nombre= models.CharField(verbose_name="Nombre de la inmobiliaria", max_length= 70)
    descripcion= models.TextField(verbose_name="Descripción breve de la inmobiliaria" , max_length=200)

    # Página home
    negrito= models.CharField(verbose_name= "Titulo en negrito de la página de home", max_length= 20)
    gris= models.CharField(verbose_name= "Titulo en gris de la página de home", max_length= 30)
    home_text= models.TextField(verbose_name= "Texto principal de la página de home", max_length= 200)

    titulo_casas_home= models.CharField(verbose_name= "Titulo que aparece arriba de las casas del home", max_length= 20)

    titulo_contacto_home= models.CharField(verbose_name= "Titulo de los pasos de contacto del home", max_length= 24)
    titulo_uno_contacto= models.CharField(verbose_name= "Titulo del primer paso de contacto del home", max_length= 28)
    texto_uno_contacto= models.TextField(verbose_name= "Texto del primer paso de contacto del home", max_length=110)
    titulo_dos_contacto= models.CharField(verbose_name= "Titulo del segundo paso de contacto del home", max_length= 28)
    texto_dos_contacto= models.TextField(verbose_name= "Texto del segundo paso de contacto del home", max_length=110)
    titulo_tres_contacto= models.CharField(verbose_name= "Titulo del tercer paso de contacto del home", max_length= 28)
    texto_tres_contacto= models.TextField(verbose_name= "Texto del tercer paso de contacto del home", max_length=110)
    ultimo_texto_contacto= models.TextField(verbose_name= "Texto de la última caja de pasos de contactos del home", max_length=110)

    # Medio de contacto
    numero= models.PositiveIntegerField(verbose_name="Numero de telefono para contactarse con la inmobiliaria")
    mail= models.EmailField(verbose_name="Email para contactarse con la inmobiliaria")
    ig= models.CharField(verbose_name="Instagram de la inmobiliaria", max_length=30)
    medio_contacto= JSONField(verbose_name= "Medio de contacto extra", blank= True, null= True)

    # Página nosotros
    subtitulo_nosotros= models.CharField(verbose_name="Subtítulo del texto de la página nosotros", max_length= 30)
    titulo_nosotros= models.TextField(verbose_name= "Título del texto de la pagina nosotros", max_length=100)
    texto_nosotros= models.TextField(verbose_name= "Texto de la pagina nosotros", max_length=450)

    imagen1_nosotros= models.ImageField(verbose_name="Imágen del texto ubicado a la izquierda de la segunda sección de la página nosotros", upload_to="nosotros/seccion2/imagenes")
    subtitulo1_nosotros= models.CharField(verbose_name="Subtitulo del texto ubicado a la izquierda de la segunda sección de la página nosotros", max_length=22)
    titulo1_nosotros= models.TextField(verbose_name="Título del texto ubicado a la izquierda de la segunda sección de la página nosotros", max_length=16)
    texto1_nosotros= models.TextField(verbose_name="Texto ubicado a la izquierda de la segunda sección de la página nosotros", max_length=160)

    imagen2_nosotros= models.ImageField(verbose_name="Imágen del texto ubicado a la derecha de la segunda sección de la página nosotros", upload_to="nosotros/seccion2/imagenes")
    subtitulo2_nosotros= models.CharField(verbose_name="Subtitulo del texto ubicado a la derecha de la segunda sección de la página nosotros", max_length=22)
    titulo2_nosotros= models.TextField(verbose_name="Título del texto ubicado a la derecha de la segunda sección de la página nosotros", max_length=16)
    texto2_nosotros= models.TextField(verbose_name="Texto ubicado a la derecha de la segunda sección de la página nosotros", max_length=160)

    # FALTA AGREGAR UNA PARTE DE LA PÁGINA NOSOTROS

    class Meta:
        verbose_name= "Información general"
        verbose_name_plural= "Información general"

    def __str__(self):
        return self.nombre