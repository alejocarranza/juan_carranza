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
    barrios= Barrio.objects.all()
    tipos_propiedades= TipoPropiedad.objects.all()
    tipos_operaciones= TipoOperacion.objects.all()
    url= reverse("filtro",  args=["None"])

    imagenes_principales= []
    for casa in casas:
        imagenes_principales.append(casa.imagen_principal.url)

    combined_data = list(zip(casas, imagenes_principales))
    params={
        "barrio": barrio,
        "combined_data": combined_data,
        "barrios": barrios,
        "tipos_propiedades": tipos_propiedades,
        "tipos_operaciones": tipos_operaciones,
        "url": url,
    }
    return render(request, "barrios/barrioX.html", params)

def casas(request, slugBarrio, slugCasa):
    casa= Casa.objects.get(slug= slugCasa)
    barrio= casa.direccion
    imagen_principal = casa.imagen_principal2.url
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
    # Si no hay parametros te manda a la url de barrios
    if parametros== "None": return HttpResponseRedirect(reverse('barrios'))

    # Separo los parametros en 3 listas: keys(filtro), values(opcion), quantities(cantidad de opciones por filtro)
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

    # Si es posible, te manda a la url de barioX. Si solo filtras un barrio o si filtras un barrio y tipo casa.
    if len(keys)== 1 and len(values)== 1 and keys[0]== "barrio":
        return HttpResponseRedirect(reverse("barrioX", args= [values[0]]))
    if len(keys)== 2 and len(values)== 2:
        e_barrio= False
        e_tipo_prop= False
        for key in keys: 
            if key== "barrio": e_barrio= True
            if key== "tipo_prop": e_tipo_prop= True
        if e_barrio and e_tipo_prop:
            index= -1
            tipo_casa= "False"
            for val in values:
                index+= 1
                if val== "casa": tipo_casa= index
            if tipo_casa!= "False":
                if tipo_casa==0: index= 1
                elif tipo_casa==1: index= 0
                return HttpResponseRedirect(reverse("barrioX", args= [values[index]]))
    # Si hay un solo value y es casa, te manda a barrios
    if len(values)== 1 and values[0]== "casa":
        return HttpResponseRedirect(reverse('barrios'))

    # Acomodo en un diccionario las keys y values con la quantity correspondiente
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

    # Busco en la bd las casas que cumplan con los filtros seleccionados
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

    # Busco las imágenes relacionadas a las casas y las relaciono con las casas en un diccionario.
    imagenes_principales= []
    for casa in casas:
        imagenes_principales.append(casa.imagen_principal.url)
    combined_data = list(zip(casas, imagenes_principales))

    # Datos necesarios para que aparezca la opcion de filtros
    barrios= Barrio.objects.all()
    tipos_propiedades= TipoPropiedad.objects.all()
    tipos_operaciones= TipoOperacion.objects.all()
    url= reverse("filtro",  args=["None"])

    params= {
        "barrios": barrios,
        "tipos_propiedades": tipos_propiedades,
        "tipos_operaciones": tipos_operaciones,
        "url": url,
        "filtros": values,
        "combined_data": combined_data,
    }
    return render(request, 'casas/filtro.html', params)


