from casas.models import Casa
from casas.models import Barrio
from home.models import Informacion

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
