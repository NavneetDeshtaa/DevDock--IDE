
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

https://dev-dock-ide-murex.vercel.app
    
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
