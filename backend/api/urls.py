from django.urls import path
from .views import summarize_text, hello_backend

urlpatterns = [
    path('summarize/', summarize_text, name='summarize_selector'),
    path('hello/', hello_backend, name='hello_backend')  
]
