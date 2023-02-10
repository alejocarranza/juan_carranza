from django.shortcuts import render
from .models import Casa

# Create your views here.

def casas(request, slugCasa):
    casa1= Casa.objects.get(slug= slugCasa)

    params= {
        "casa": casa1
    }

    return render(request, 'casas/casaX.html', params)