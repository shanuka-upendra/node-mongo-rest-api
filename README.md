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
