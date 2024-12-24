# Use the official Node.js image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /appFrontend

# Copy only the package.json and package-lock.json first
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Install a lightweight HTTP server
RUN npm install -g serve

# Expose the port the server will run on
EXPOSE 3000

# Start the server to serve the build folder
CMD ["serve", "-s", "build", "-l", "3000"]
