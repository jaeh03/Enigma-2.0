# Use a fuller version of Node.js for debugging purposes
FROM node:latest

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Install serve globally
RUN npm install -g serve

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Serve the built application
CMD ["serve", "-s", "build", "-l", "3000"]



# FROM node:alpine

# WORKDIR /app

# COPY . .

# RUN npm install

# CMD ["npm", "run", "build"]
