#!/bin/sh

# Apply database migrations
python manage.py makemigrations
python manage.py migrate --no-input

# Collect static files
python manage.py collectstatic --no-input

# Start Gunicorn server with hot reloading
gunicorn backend.wsgi:application --bind 0.0.0.0:8000
