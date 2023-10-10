# The first stage is to build the frontend
FROM node:16 as build

WORKDIR /app/frontend
COPY ../frontend/package.json ./
RUN npm install
COPY ../frontend .  
RUN npm run build

# The second stage is to build the web server
FROM nginx:alpine
COPY --from=build /app/frontend/build/ /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]