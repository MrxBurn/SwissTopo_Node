# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["node", "swisstopo_api/apis.js"]