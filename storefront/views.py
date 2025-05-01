from urllib import request
from django.shortcuts import render

def home():
    return render(request,'home.html')