from django.shortcuts import render
from .models import Casa
from .models import Barrio

# Create your views here.
def get_images_by_option(slug, option):
    casa = Casa.objects.get(slug=slug)
    images = casa.imagenes.filter(opcion=option)
    return images


def barrios(request):
    barrios= Barrio.objects.all()

    params= {
        "barrios": barrios
    }
    return render(request, "barrios/barrios.html", params)

def barrioX(request):
    barrios= Barrio.objects.all()

    params= {
        "barrios": barrios
    }
    return render(request, "barrios/barrios.html", params)

def casas(request, slugBarrio, slugCasa):
    casa= Casa.objects.get(slug= slugCasa)
    barrio= casa.direccion
    imagen_principal = casa.imagenes.filter(opcion='principal').first().imagen.url
    imagenes_exteriores = get_images_by_option(slugCasa, 'exteriores')
    imagenes_interiores = get_images_by_option(slugCasa, 'interiores')
    imagenes_avances = get_images_by_option(slugCasa, 'avance_de_obra')
    imagenes_planos = get_images_by_option(slugCasa, 'planos')

    print(barrio)
    params= {
        "casa": casa,
        "barrio": barrio,
        "imagen_principal": imagen_principal,
        "imagenes_exteriores": imagenes_exteriores,
        "imagenes_interiores": imagenes_interiores,
        "imagenes_avances": imagenes_avances,
        "imagenes_planos": imagenes_planos,
    }

    return render(request, 'casas/casaX.html', params)