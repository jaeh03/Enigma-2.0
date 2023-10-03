from django.urls import path
from .views import summarize_text, hello_backend, test_view

urlpatterns = [
    path('summarize/', summarize_text, name='summarize_text'),
    path('hello/', hello_backend, name='hello_backend'),
    path('test/', test_view, name='test_view')  
]
