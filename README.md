# Phone User Management API

This is a RESTful API for managing phone users. It allows you to perform CRUD operations (Create, Read, Update, Delete) on phone users.

## Technologies

- Node.js
- SQL Server Management Studio (SSMS) or Azure Data Studio (ADS)
- Postman
- Visual Studio Code (VS Code) or any other IDE
- Git

## Installation

1. Clone the repository:
```
git clone <repository-url>
```
   
## Install the dependencies:
```
cd <project-folder>
npm install
```

## Set up the environment variables:
# .env
```
PORT=<port-number>
HOST=<host-name>
HOST_URL=<host-url>
SQL_USER=<sql-username>
SQL_PASSWORD=<sql-password>
SQL_DATABASE=<sql-database-name>
SQL_SERVER=<sql-server-name>
SQL_ENCRYPT=<true-or-false>
Replace <port-number>, <host-name>, <host-url>, <sql-username>, <sql-password>, <sql-database-name>, <sql-server-name>, and <true-or-false> with your actual configuration.
```

## Usage
Start the server:
```
npm start
```
## Access the API endpoints:

```
GET all users: GET /users
GET user by ID: GET /users/:id
Create user: POST /users
Update user: PUT /users/:id
Delete user: DELETE /users/:id
API Documentation
```
## License
This project is licensed under the MIT License.