from . import views
from django.urls import path

urlpatterns = [
    path('<str:slugCasa>', views.casas, name='casas'),
]