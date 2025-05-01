from django.shortcuts import render
from .models import Destination

def index(request):
   destinations=Destination.objects.all().order_by('display_order')
   return render(request,'index.html', {'destinations': destinations})