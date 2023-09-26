from django.urls import path
from . import views  # Import the views module from the current directory

urlpatterns = [
    path('summarize/', views.summarize_text, name='summarize_text'),
    path('hello/', views.hello_backend, name='hello_backend'),
    path('transcribe-audio/', views.transcribe_audio, name='transcribe_audio'),  
]