
# DevDock-IDE

A fully functional web-based IDE with support for real-time code editing, project creation, deletion, and code
download functionality, allowing users to code in up to 7 programming languages.


## Features

- User Authentication – Signup/Login with email verification
- OTP-Based Verification – Users must verify their email before creating an account
- Code Editor – Supports multiple programming languages
- Cross platform


## Tech Stack

**Client:** React, JavaScript, TailwindCSS, File-Saver, jsZip

**Server:** NodeMailer, otp-generator,Node, Jsonwebtokens, Bcrypt.Js


## Demo

https://dev-dock-ide-navneet-deshtas-projects.vercel.app
    
## Run Locally

Clone the project

```bash
  git clone https://github.com/NavneetDeshtaa/DevDock--IDE.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_URI=your_mongodb_connection_string`

`JWT_SECRET=your_jwt_secret`

`EMAIL_USER=your_email@gmail.com`

`EMAIL_PASS=your_email_password`


## Run Locally with Docker

This project has been fully dockerized for easy deployment. There are three Docker images:

1.Backend: Node.js + Express API

2.Frontend: Vite React app served via Nginx

3.MongoDB: Official MongoDB image (or you can use cloud MongoDB)

# Build and Run with Docker Compose

 1. Make sure Docker is installed and running.

 2. From the project root (where docker-compose.yml is located), run:  docker-compose up --build

 3. This will:
    - Build the backend and frontend Docker images locally
    - Start backend on port 3000
    - Start frontend on port 5173
    - Start MongoDB on port 27017
   

 ## Pull Prebuilt Images from Docker Hub - 

  If you don’t want to build locally, you can use the prebuilt images from Docker Hub:

  - docker pull navneetdeshta/backend-devdock:latest
  - docker pull navneetdeshta/frontend-devdock:latest
  - docker pull mongo:6.0
