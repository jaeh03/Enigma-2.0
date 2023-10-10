from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    # path('', include('frontend.urls')),
    # path('buffer-page/', include('frontend.urls')),
    # path('audio-summary-transcription/', include('frontend.urls')),
    # path('about/', include('frontend.urls')),
    # path('new-summary/', include('frontend.urls'))
]

