from django.urls import path
from . import views  # Import the views module from the current directory

urlpatterns = [
    path('summarize/', views.summary_selector, name='summary_selector'),
    path('hello/', views.hello_backend, name='hello_backend'),
    path('test/', views.test_view, name='test_view'),
    path('transcribe-audio/', views.transcribe_audio, name='transcribe_audio'),  
    path('download_Audio/', views.download_Audio, name='downloadAudio'),
    path('auto_chapter/', views.auto_chapter, name='auto_chapter')
]