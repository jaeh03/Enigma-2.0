# Use Nginx official image as the base image
FROM nginx:alpine

# Copy the React build directory to Nginx's serve directory
COPY frontend/build/ /usr/share/nginx/html/

# Copy the Nginx configuration file
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
