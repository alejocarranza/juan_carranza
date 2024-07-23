from django.shortcuts import render
from casas.models import Casa
from casas.models import Imagen

# Create your views here.

def home(request):
    casas= Casa.objects.all()

    casasImagen= {}
    for i in range(casas.count()):
        casasImagen[casas[i].slug]= {
            "nombre": casas[i].nombre, 
            "imagen_principal": {
                "url": casas[i].imagen_principal.url,
            },
            "imagen_principal1": {
                "url": casas[i].imagen_principal1.url,
            },
        }

    params= {
        "casasImagen": casasImagen,
    }
    return render(request, 'home/index.html', params)