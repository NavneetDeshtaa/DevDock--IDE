# 1. Build stage
FROM node:18-alpine AS build

# 2. Set the /app as working directory inside the container .
WORKDIR /app

# 3. Copy  package.json and package-lock.json to the container inside /app .
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# 2. Production stage
FROM nginx:alpine

# Vite outputs to 'dist', not 'build'
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80


CMD ["nginx", "-g", "daemon off;"]
