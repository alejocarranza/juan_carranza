from . import views
from django.urls import path

urlpatterns = [
    path('', views.barrios, name='barrios'),
    path('<str:slugBarrio>', views.barrioX, name='barrioX'),
    path('<str:slugBarrio>/<str:slugCasa>', views.casas, name='casas'),
]