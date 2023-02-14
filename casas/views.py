from django.shortcuts import render
from .models import Casa

# Create your views here.

def get_images_by_option(slug, option):
    casa = Casa.objects.get(slug=slug)
    images = casa.imagenes.filter(opcion=option)
    return images

def casas(request, slugCasa):
    casa1= Casa.objects.get(slug= slugCasa)
    imagen_principal = casa1.imagenes.filter(opcion='principal').first().imagen.url
    imagenes_exteriores = get_images_by_option(slugCasa, 'exteriores')
    imagenes_interiores = get_images_by_option(slugCasa, 'interiores')
    imagenes_avances = get_images_by_option(slugCasa, 'avance_de_obra')
    imagenes_planos = get_images_by_option(slugCasa, 'planos')

    params= {
        "casa": casa1,
        "imagen_principal": imagen_principal,
        "imagenes_exteriores": imagenes_exteriores,
        "imagenes_interiores": imagenes_interiores,
        "imagenes_avances": imagenes_avances,
        "imagenes_planos": imagenes_planos,
    }

    return render(request, 'casas/casaX.html', params)