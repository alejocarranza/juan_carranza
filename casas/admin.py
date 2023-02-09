from django.contrib import admin
from .models import Casa
from .models import Barrio
from .models import Imagen

# Register your models here.

class CasaInline(admin.TabularInline):
    model= Casa
    extra= 0

class BarrioAdmin(admin.ModelAdmin):
    # Read
    search_fields= ("nombre")
    list_filter= ("privado")

class CasaAdmin(admin.ModelAdmin):
    pass

admin.site.register(Barrio)
admin.site.register(Imagen)
admin.site.register(Casa)