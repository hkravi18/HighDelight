# Basic API for user authentication

## Project Description

This is a simple project based on MERN tech stack for basic user authentication (signup and login) along with OTP verifying functionality.

## Table of Contents

- [Features](#features)
- [Development Features](#development-features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Routes](#api-routes)
- [Backend](#backend)
- [Database](#database)

## Features

- User registration and authentication
- Uses JWT for authentication and password resetting
- Email is send to given email address on signup

## Development Features

- Custom Logger is made for logging every request to the server
- Eslint is used for linting and for finding errors with standard rules
- Prettier is used for code formatting
- Lint-staged is used for running prettier and eslint on all changed files in each commit
- Husky is used to provide git hooks for pre-commit and pre-push

## Technologies Used

- Express.js
- MongoDB
- Node.js

## Prerequisites

- Node.js [Installation Guide](https://nodejs.org/)
- MongoDB [Installation Guide](https://docs.mongodb.com/manual/installation/)

## Installation

1. Clone the repository:

git clone <REPO_URL> project

2. Navigate to the project directory:

cd project

3. Install dev dependencies at the **root** (for linting and prettier):

npm install

4. Change directory to server:

cd server

5. Install dependencies for the server:

npm install

6. Set up environment variables (a .env file is needed for this expressJS server, instructions provided in `Configuration`).

7. Start the server:

In server directory:

- To start the server using Nodemon **npm run dev**
- To start the server without Nodemon **npm start**

> NOTE: Start the mongodb daemon if you are using local mongodb database. If you're using remote service, then replace the MONGO_URI in .env with the database connection string of the remote service you are using.

8. Go to the client directory:

cd client

9. Install dependencies for the client:

npm install

10. Start the client:

npm run dev

11. Go to the following URL:

**http://localhost:5173**

## Configuration

### Server .env configuration

- Create a `.env` file in the server directory of the project with the content mentioned in the **.env.example** file:
- Fill the environment variables values

FOR EXAMPLE:

```.env
PORT=4000

# or any other deployed database connection string <MONGO_URI>
MONGO_URI=mongodb://127.0.0.1:27017

NODE_ENV=development
JWT_SECRET_KEY=secret

# Email environment variables
HOST=smtp.gmail.com
USER_EMAIL=
USER_PASSWORD=
```

### Client .env configuration

- Create a `.env` file in the client directory of the project with the content mentioned in the **.env.example** file:
- Fill the environment variables values

FOR EXAMPLE:

```.env
VITE_API_URL=http://localhost:4000
```

**If you are using local mongodb MONGO_URI=`mongodb://localhost:27017`**

**Start Mongodb Daemon To use local mongodb database**

**USER_EMAIL** is the email address which will send the email to those users who wants to reset password

**USER_PASSWORD** is the app password for the associated email address

> IMP NOTE: The **USER_EMAIL** should be allowed to send email (App passwords should be allowed in the coresspoding google account setting, as Google has changed some setting regarding the App password)

## Usage

Signup is done with first name, last name, contact mode, email id and password  
Login is done with email and password

## API Routes

### All API related docs are available in API_DOCS.md file

## Backend

- Router are created for authentication.
- Controllers are created for handling routes of these routers.
- Bcrypt is used to encrypt the passwords before saving to the database.
- JWT is used to authenticate the user
- Nodemailer is used to send a resetting password email (currently restricted to google email accounts only).

## Database

Mongodb is used as a primary database for this project along with Mongoose as an ORM.  
Local Mongodb is used currently for the database services.
