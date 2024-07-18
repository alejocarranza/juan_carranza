from django.shortcuts import render
from django.shortcuts import HttpResponseRedirect
from django.urls import reverse
from .models import Casa
from .models import Barrio
from .models import TipoOperacion
from .models import TipoPropiedad

# Create your views here.
def get_images_by_option(slug, option):
    casa = Casa.objects.get(slug=slug)
    images = casa.imagenes.filter(opcion=option)
    return images


def barrios(request):
    barrios= Barrio.objects.all()
    tipos_propiedades= TipoPropiedad.objects.all()
    tipos_operaciones= TipoOperacion.objects.all()
    url= reverse("filtro",  args=["None"])

    params= {
        "barrios": barrios,
        "tipos_propiedades": tipos_propiedades,
        "tipos_operaciones": tipos_operaciones,
        "url": url,
    }
    return render(request, "barrios/barrios.html", params)

def barrioX(request, slugBarrio):
    barrio= Barrio.objects.get(slug= slugBarrio)
    casas= Casa.objects.filter(direccion= barrio)

    imagenes_principales= []
    for casa in casas:
        imagenes_principales.append(casa.imagenes.filter(opcion='principal').first().imagen.url)

    combined_data = list(zip(casas, imagenes_principales))
    params={
        "barrio": barrio,
        "combined_data": combined_data,
    }
    return render(request, "barrios/barrioX.html", params)

def casas(request, slugBarrio, slugCasa):
    casa= Casa.objects.get(slug= slugCasa)
    barrio= casa.direccion
    imagen_principal = casa.imagenes.filter(opcion='principal').first().imagen.url
    imagenes_exteriores = get_images_by_option(slugCasa, 'exteriores')
    imagenes_interiores = get_images_by_option(slugCasa, 'interiores')
    imagenes_avances = get_images_by_option(slugCasa, 'avance_de_obra')
    imagenes_planos = get_images_by_option(slugCasa, 'planos')

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
    
def filtro(request, parametros):
    if parametros== "None": return HttpResponseRedirect(reverse('barrios'))

    parametros= parametros.split('-')

    keys= []
    values=[]
    quantities= []
    quantity= 0
    for i in parametros:
        if i[0]== "0":
            quantities.append(quantity)
            quantity= 0
            keys.append(i[1:])
        else:
            quantity+= 1
            values.append(i[1:])
    quantities.append(quantity)
    quantities= quantities[1:]

    if len(keys)== 1 and len(values)== 1 and keys[0]== "barrio":
        return HttpResponseRedirect(reverse("barrioX", args= [values[0]]))

    parameters= {}
    i= 0
    first= 0
    last= 0
    for key in keys:
        first= last
        last= first+quantities[i]
        valores= values[first:last]

        parameters[key]= valores

        i+=1

    casas= None
    for key, value in parameters.items():
        filtro= None
        if key== "barrio":
            for val in value:
                direccion= Barrio.objects.get(slug= val)
                filtro1= Casa.objects.filter(direccion= direccion)
                if not filtro: filtro= filtro1
                else: filtro= filtro | filtro1

        elif key== "tipo_op":
            for val in value:
                tipo_operacion= TipoOperacion.objects.get(slug= val)
                filtro1= Casa.objects.filter(tipo_operacion= tipo_operacion)
                if not filtro: filtro= filtro1
                else: filtro= filtro | filtro1
        else:
            for val in value:
                tipo_propiedad= TipoPropiedad.objects.get(slug= val)
                filtro1= Casa.objects.filter(tipo_propiedad= tipo_propiedad)
                if not filtro: filtro= filtro1
                else: filtro= filtro | filtro1

        if casas== None: casas= filtro
        else: casas= casas.intersection(filtro) 

    imagenes_principales= []
    for casa in casas:
        imagenes_principales.append(casa.imagenes.filter(opcion='principal').first().imagen.url)

    combined_data = list(zip(casas, imagenes_principales))

    barrios= Barrio.objects.all()
    tipos_propiedades= TipoPropiedad.objects.all()
    tipos_operaciones= TipoOperacion.objects.all()
    url= reverse("filtro",  args=["None"])

    params= {
        "barrios": barrios,
        "tipos_propiedades": tipos_propiedades,
        "tipos_operaciones": tipos_operaciones,
        "url": url,
        "filtros": parameters,
        "combined_data": combined_data,
    }
    return render(request, 'casas/filtro.html', params)


