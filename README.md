# Node.js Express REST API with Prisma

## Description

This project is a Node.js application using Express.js and Prisma. It provides APIs for user management and post operations. The application includes functionalities for user registration, login, and image management. It uses PostgreSQL as the database and features UUIDs for IDs, custom validation with Vine.js, and image upload capabilities.

## Features

- **User Management:** Registration and login with JWT authentication.
- **Post Management:** CRUD operations for posts (Create, Read, Update, Delete).
- **Image Upload:** Upload images with validation (max 2 MB, allowed formats: PNG, JPEG, SVG, WebP).
- **Custom Validation:** Using Vine.js for custom validations.
- **Scalable Prisma Schema:** Organized into separate files for better scalability.

## Prerequisites

- Node.js (v18.x or higher)
- npm (v6.x or higher)
- PostgreSQL database
- A tool for managing PostgreSQL databases (e.g., pgAdmin)

## Installation

1. **Clone the Repository:**

   ```bash
   git clone <repository_url>
   cd <repository_directory>
Install Dependencies:

bash
Copy code
npm install
Configure Environment Variables:

Create a .env file in the root directory with the following content:

env
Copy code
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=8081
Run Database Migrations:

bash
Copy code
npx prisma migrate dev --name init
Generate Prisma Client:

bash
Copy code
npx prisma generate
Start the Application:

bash
Copy code
npm start
API Endpoints
1. Register a New User
Endpoint: POST /register

Request Body:

json
Copy code
{
  "username": "testuser",
  "email": "testuser@example.com",
  "password": "testpassword"
}
Response:

Success: Returns the user details.
Error: Shows validation errors or other issues.
2. Login
Endpoint: POST /login

Request Body:

json
Copy code
{
  "email": "testuser@example.com",
  "password": "testpassword"
}
Response:

Success: Returns a JWT token.
Error: Shows authentication errors.
3. Create a Post
Endpoint: POST /posts

Headers:

Authorization: Bearer <your_jwt_token>
Form Data:

title (string)
description (string)
image (file)
Response:

Success: Returns the created post details.
Error: Shows validation errors or other issues.
4. Get All Posts
Endpoint: GET /posts

Headers:

Authorization: Bearer <your_jwt_token>
Response:

Success: Returns a list of posts.
Error: Shows authentication errors or other issues.
5. Update a Post
Endpoint: PUT /posts/<post_id>

Headers:

Authorization: Bearer <your_jwt_token>
Form Data:

title (string)
description (string)
image (file, optional)
Response:

Success: Returns the updated post details.
Error: Shows validation errors or other issues.
6. Delete a Post
Endpoint: DELETE /posts/<post_id>

Headers:

Authorization: Bearer <your_jwt_token>
Response:

Success: Returns status 204 No Content.
Error: Shows authentication errors or other issues.
Notes
Replace <repository_url>, <repository_directory>, and <your_jwt_token> with your actual values.
Ensure that your PostgreSQL database is properly set up and accessible.
Use a tool like pgAdmin for database management and to verify data.
License
This project is licensed under the MIT License - see the LICENSE file for details.



Feel free to customize or expand upon this template as needed!
