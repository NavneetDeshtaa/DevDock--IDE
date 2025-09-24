# 1. Build stage
FROM node:18-alpine AS build

# 2. Set the /app as working directory inside the container .
WORKDIR /app

# 3. Copy  package.json and package-lock.json to the container inside /app .
COPY package*.json ./

# 4. Install all dependencies mentioned in package.json file .
RUN npm install

# 5. Copy all other files of the frontend inside the container .
COPY . .

# 6. this command builds the 'dist folder' so asto serve static files inside them . Makes our app more lightweight.
RUN npm run build

# 7. Production stage .
FROM nginx:alpine

# 8. Vite outputs to 'dist', not 'build' .
COPY --from=build /app/dist /usr/share/nginx/html

# 9. Port mapping - nginx operates at this port .
EXPOSE 80

# 10. Keep running the Nginx in foreground so that container never stops till Nginx is working . 
CMD ["nginx", "-g", "daemon off;"]
