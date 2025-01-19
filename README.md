# Support Desk Application

Support Desk Application This project is a full-stack Support Desk Application built with the MERN stack (MongoDB, Express, React, and Node.js). It allows users to create, view, and manage support tickets efficiently.

## Key Features:

- Ticket Creation: Users can create support tickets to report issues or request assistance.
- User Authentication: Secure login and registration with JWT-based authentication.
- Ticket Management: Users can track the status of their tickets, add comments, and receive updates.
- Admin Dashboard: Admin users can view, manage, and prioritize tickets submitted by users.

## How to run locally

1. Ensure you have node installed, then

- ### In the root folder run `npm install`
- ### change to the client directory and also run `npm install`

2. Create a .env file with the following variables:

- #### `MONGO_URI` This is a key to access the MongoDB database for the application. To create your own key, [Click here](https://account.mongodb.com/account/login)

- #### `JWT_SECRET_KEY` This is a key to provide authorization to a signed in user to access certain resource. You generate ssh key online [Click here](https://8gwifi.org/sshfunctions.jsp)

- #### `PORT` This is the port to access the server.

3. You can start the application with the following:

- ### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## project

https://github.com/lamodots/okayTickets
