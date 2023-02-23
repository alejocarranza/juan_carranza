from casas.models import Casa

def casas(request):
    casas= Casa.objects.all()

    return {
        'casas': casas,
    }