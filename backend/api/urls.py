from django.urls import path
from . import views  # Import the views module from the current directory

urlpatterns = [
    path('summarize/', views.summarize_text, name='summarize_selector'),
    path('hello/', views.hello_backend, name='hello_backend'),
    path('test/', views.test_view, name='test_view'),
    path('transcribe-audio/', views.transcribe_audio, name='transcribe_audio'),  
    #path('auto-chapter/', views.auto_chapter, name='auto-chapter')
]
