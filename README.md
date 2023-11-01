# Enigma 
## Authors and Acknowledgement
John Ho, William Ibarra, Hajra Rizvi, Chris Yeung

## Description 
Enigma is an application that analyzes audio and video. The application transcribes, summarizes, provide bookmarks via auto chaptering and topic detection using OpenAI and Assembly AI APIs. The user provides a video URL or file and the application strips the audio from the video and applies audio intelligence to provide the user with several options for analysis. 

## Project Status 
As of October 17th, 2023, this project continues to be maintained and supported.

## React/Django

Enigma uses a React(Node js) and Django(Python) frontend and backend.

## Current list of installations

Please update the read me as you install more installations. Backend installations can be found in the **_requirements.txt_** for the backend and the **_package.json_** for the frontend.

- backend

```
pip install djangorestframework
pip install django-cors-headers
```

- frontend

```
npm install axios
npm install react-bootstrap bootstrap
```
## What Docker commands will I need to know?

At the moment, you will likely only need to know 2 commands:

1. The first command allows you to run your **docker-compose.yaml** script, with the "-d" prefix allowing you to run it in detached mode; effectively giving you
   permission to use the console while your container is running.

```
docker-compose up -d
```

2. The second command will shut down the container.

```
docker-compose down
```
## Frequently used commands:

### Backend:

Note: most of these commands will not be needed if you are using docker-compose (recommended)

```
python -m venv venv
venv\Scripts\activate.bat
pip install django
django-admin --version
django-admin startproject project_name
python manage.py runserver
python manage.py startapp app_name
```

### Frontend:

Note: most of these commands will not be needed if you are using docker-compose (recommended)

```
npx create-react-app your-project-name
npm start
```

## What is Docker and Docker Compose, and how do I use them?

**Start by downloading Docker Desktop by [clicking here](https://www.docker.com/products/docker-desktop/)**

1. Similar to Github, we can take snapshot **images** of our code. The images contain **_all_** the code, can be shared, and ran on any operating system.
2. When we take an image of the backend, frontend, and nginx, we can run them together inside of a **container**. This is where Docker Compose comes in, as it allows us to orchestrate images in a way that allows them to run together inside of a container.
3. In order to make data persist across images and containers, we use **Volumes**.
4. **In order to run Containers, Images, and Volumes**, you must run the **Docker Daemon**. Docker Desktop comes with the Daemon built-in, and is highly recommended as it allows you to view all your docker assets in one place.
5. Docker Images are linux based, therefore we must move content into specific folder locations within the images. You can view what is inside of your image through Docker Desktop.

## Troubleshooting Docker and Docker Compose

While problems are typically minimal, follow these steps:

1. Select running container > delete
2. Select images > delete
3. Select volumes > delete
4. Re-run your 'docker-compose up -d' script

## Technologies Used 

### AssemblyAI API
AssemblyAI specializes in providing audio and video intelligence. It is with AssemblyAI that bookmarking and topic detection is employed in our application.  

### Django 
High-level open-source web framework written in Python. Provides developers everything needed to build web applications out of the box. Django Rest Framework provides the means for working with web APIs and use RESTful services. 

### Docker
Docker is a platform designed to create, deploy and run our application. 

### OpenAI API
OpenAI API allows developers to integrate OpenAI's powerful machine learning models, like ChatGPT, into their own applications. This enables our users to make requests to these models and receive responses. This API currently provides text transcription and summarization capabilities to our application. 

### Python 
High level programming language used for our application's backend.

### React
A popular JavaScript library for building the frontend of our application. 






