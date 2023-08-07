# MERN Stack Todo Application

This is a Todo Application built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). The application allows users to manage their tasks by adding, updating, and deleting them. The front end is implemented using React.js for a user-friendly interface, and the back end is built with Node.js and Express.js. MongoDB is used as the database to store tasks.


## Features

- Add new tasks with a title and description.
- Display the list of tasks with options to mark tasks as completed or delete them.
- Update the title and description of existing tasks.
- Form validation to ensure users enter valid data for the tasks.
- RESTful APIs for communication between front-end and back-end.
- Error handling and appropriate status codes for API responses.
- MongoDB used as the database to store tasks.
- Pagination for managing large task lists.
- Responsive design for optimal use on different devices.

## Installation

To run the application locally, follow these steps:

1. Clone the repository from GitHub:

```bash
git clone https://github.com/raees724/MERN-TODO-APP.git
```

2. Navigate to the project directory and install dependencies using npm:

```bash
cd your-repo
npm install
```

3. Create a `.env` file in the root directory and provide the necessary environment variables, such as MongoDB connection string and JWT access token secret, and Refresh token secret.

4. Start the development server:

```bash
npm run dev
```

The application will be accessible at `http://localhost:7000`.
