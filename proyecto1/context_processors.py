from casas.models import Casa
from casas.models import Barrio
from home.models import Informacion
from home.models import Images

def casas(request):
    casas= Casa.objects.all()

    return {
        'casas': casas,
    }

def global_variable(request):
    informacion= Informacion.objects.get(ID= 1)
    barrios= Barrio.objects.all().reverse()[:5]

    return {
        "informacion": informacion,
        "barrios5": barrios,
    }

def images(request):
    images= Images.objects.get(id= 1)
    return {
        "images": images,
    }