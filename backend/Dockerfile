# 1. Use official Node.js runtime as base
FROM node:18-alpine

# 2. Set working directory inside container
WORKDIR /app

# 3. Copy package.json and package-lock.json first
COPY package*.json ./

# 4. Install only production dependencies
RUN npm install --only=production

# 5. Copy rest of backend source code to the container
COPY . .

# 6. Expose the port your Express app runs on
EXPOSE 3000

# 7. Run the app with the production start script
CMD ["npm", "start"]
