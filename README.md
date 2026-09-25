# Node Mongo REST API

A simple REST API for user management and authentication built with **Node.js**, **Express**, and **MongoDB**.

## Overview

This project provides:

- User registration and login
- JWT-based route protection
- User CRUD operations
- Input validation and centralized error handling

## Prerequisites

Before running the project, make sure you have:

- Node.js 18+ (or a recent LTS version)
- npm
- MongoDB instance (local or remote)

## Environment Variables

Create a `.env` file inside:

`/home/runner/work/node-mongo-rest-api/node-mongo-rest-api/user-api`

Example:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/user-api
DB_NAME=user-api
JWT_SECRET=your-strong-secret
JWT_EXPIRES_IN=7d
```

## Installation

```bash
cd /home/runner/work/node-mongo-rest-api/node-mongo-rest-api/user-api
npm install
```

## Run the API

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

When the server starts, it listens on `http://localhost:3000` by default.

## API Endpoints

Base URL: `http://localhost:3000/api`

### Auth (public)

- `POST /auth/register` — Register a user
- `POST /auth/login` — Login and receive JWT token

### Users (protected)

All routes below require a valid JWT in the Authorization header.

- `GET /users` — List users (supports `page`, `limit`, `search`)
- `GET /users/:id` — Get user by ID
- `POST /users` — Create user
- `PUT /users/:id` — Update user fields
- `DELETE /users/:id` — Delete user

## Sample Request Bodies

Register:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "pass1234",
  "age": 28
}
```

Login:

```json
{
  "email": "john@example.com",
  "password": "pass1234"
}
```
