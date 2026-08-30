# EventPulse API

EventPulse is a backend API for discovering events, registering as an attendee, and receiving real-time announcements from event organizers. It provides authentication, role-based authorization, event management, capacity-safe registrations, and real-time announcements using Socket.io.

## Tech Stack

* **Node.js** — JavaScript runtime
* **Express.js** — REST API framework
* **MongoDB & Mongoose** — Database and ODM
* **Socket.io** — Real-time event announcements
* **JSON Web Tokens (JWT)** — Authentication and authorization
* **express-validator** — Request validation
* **Jest** — Testing framework
* **Supertest** — API integration testing
* **Swagger / OpenAPI** — Interactive API documentation
* **Vercel** — Deployment platform

## Local Installation

### 1. Clone the repository

```bash
git clone https://github.com/doaasoliman733/EYOUTH-30906240105466-EventPulse.git
cd EYOUTH-30906240105466-EventPulse
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
PORT=3000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
```

Replace the placeholder values with your own MongoDB connection string and JWT secret.

**Do not commit the `.env` file to Git.**

### 4. Seed the database

Run:

```bash
npm run seed
```

This creates the initial users, categories, and sample events.

The seeded admin account is:

```text
Email: admin@eventpulse.com
Password: password123
Role: admin
```

The seeded attendee account is:

```text
Email: attendee@eventpulse.com
Password: password123
Role: attendee
```

### 5. Start the development server

```bash
npm run dev
```

The API will be available at:

```text
http://localhost:3000
```

## Health Check

Check whether the API and database are running:

```text
GET /health
```

A successful response includes:

```json
{
  "status": "ok",
  "environment": "development",
  "uptime": 5.18,
  "database": "connected"
}
```

## API Documentation

Interactive Swagger documentation is available at:

```text
http://localhost:3000/api-docs
```

Swagger provides an interactive interface for viewing and testing the API endpoints.

## API Endpoint Summary

### Authentication

| Method | Endpoint             | Description              |
| ------ | -------------------- | ------------------------ |
| POST   | `/api/auth/register` | Register a new user      |
| POST   | `/api/auth/login`    | Log in and receive a JWT |

### Events

| Method | Endpoint          | Description                                                |
| ------ | ----------------- | ---------------------------------------------------------- |
| GET    | `/api/events`     | Get events with filtering, pagination, sorting, and search |
| POST   | `/api/events`     | Create a new event                                         |
| GET    | `/api/events/:id` | Get a specific event                                       |
| PATCH  | `/api/events/:id` | Update an event                                            |
| DELETE | `/api/events/:id` | Delete an event                                            |

### Registrations

| Method | Endpoint                 | Description                                  |
| ------ | ------------------------ | -------------------------------------------- |
| POST   | `/api/registrations`     | Register the authenticated user for an event |
| GET    | `/api/registrations/my`  | Get the authenticated user's registrations   |
| DELETE | `/api/registrations/:id` | Cancel a registration                        |

### Announcements

| Method | Endpoint                      | Description                         |
| ------ | ----------------------------- | ----------------------------------- |
| POST   | `/api/announcements`          | Create an announcement for an event |
| GET    | `/api/announcements/:eventId` | Get announcements for an event      |

## Authentication

Protected endpoints require a valid JWT.

After logging in, include the token in the request header:

```text
Authorization: Bearer <your_token>
```

Some endpoints require an administrator role.

## Real-Time Announcements

EventPulse uses Socket.io to deliver event announcements in real time.

When an administrator creates an announcement, connected clients subscribed to the corresponding event room receive the announcement through the `announcement` event.

## Testing

Run the automated Jest test suite with:

```bash
npm test
```

The project includes unit and integration tests using Jest and Supertest.

## Postman Collection

A structured Postman collection is included in the `postman/` directory for API testing.

The collection is organized into:

* Auth
* Events
* Registrations
* Announcements

It uses the `EventPulse Dev` environment with:

```text
baseUrl = http://localhost:3000
token = <your JWT token>
```

## Live Deployment

**Vercel Deployment:**

> Replace this with your actual Vercel URL after deployment.

```text
https://eyouth-30906240105466-event-pulse-fjkkknhre.vercel.app
```

### Live Health Check

```text
https://eyouth-30906240105466-event-pulse-fjkkknhre.vercel.app/health
```

### Live Swagger Documentation

```text
https://eyouth-30906240105466-event-pulse.vercel.app/api-docs/
```
