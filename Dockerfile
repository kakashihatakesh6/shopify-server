#parent image
FROM node:18

#Working directory
WORKDIR /app

#install curl
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

#Copy Package files intall dependency
COPY package*.json ./

#Install Dependencies
RUN npm install

#Copy the rest of the app's source code
COPY . .

#Expose the Port that the app runs on
EXPOSE 5000

# Define the command to run the app
CMD ["node", "index.js"]
