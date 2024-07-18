from . import views
from django.urls import path

urlpatterns = [
    path('', views.barrios, name='barrios'),
    path('barrio/<str:slugBarrio>', views.barrioX, name='barrioX'),
    path('casa/<str:slugBarrio>/<str:slugCasa>', views.casas, name='casas'),
    path('filtro/<str:parametros>', views.filtro, name='filtro'),
]