FROM python:3.9

# Ensures Python's output is sent straight to the terminal.
ENV PYTHONUNBUFFERED 1

# Upgrade pip and set the working directory
RUN pip install --upgrade pip
WORKDIR /app

# Copy only the requirements file and install dependencies
COPY ./requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application
COPY . .

# Set the entrypoint script
ENTRYPOINT ["sh", "entrypoint.sh"]
