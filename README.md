# 🏋️ GymApp

A complete application inspired by GymPass, developed for learning purposes and deepening knowledge in **Node.js**.

## 📋 About the Project

This project simulates a gym management system where users can:

- Register and authenticate
- Search for nearby gyms
- Check-in at gyms
- Track personal history and metrics

The system also allows administrators to manage gyms and validate user check-ins.

## 🚀 Technologies Used

<div align="center">

### Backend

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Fastify](https://img.shields.io/badge/Fastify-000000?style=for-the-badge&logo=fastify&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Bcrypt](https://img.shields.io/badge/Bcrypt-5E72E4?style=for-the-badge&logo=security&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)

### Testing

![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)
![Supertest](https://img.shields.io/badge/Supertest-FF6B6B?style=for-the-badge&logo=jest&logoColor=white)

### DevOps

![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Docker Compose](https://img.shields.io/badge/Docker_Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)

</div>

## 🐳 How to Run the Project

### Prerequisites

- Node.js (version 18+)
- Docker and Docker Compose
- Git

### 1. Clone the repository

```bash
git clone https://github.com/lucasbarbosaalves/gym-app.git
cd gym-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
# Copy the example file
cp .env.example .env

# Configure variables (mainly DATABASE_URL and JWT_SECRET)
```

### 4. Start the database

```bash
# Start PostgreSQL via Docker
docker-compose up -d

# Or just the database:
docker-compose up postgres -d
```

### 5. Run migrations

```bash
# Apply database migrations
npx prisma migrate dev

# Generate Prisma client
npx prisma generate
```

### 6. Start the application

#### Development

```bash
# Development mode with hot reload
npm run dev

# Application will be available at http://localhost:3333
```

#### 📖 Endpoints

API routes are organized into:

- `/users` - User management
- `/sessions` - Authentication
- `/gyms` - Gym management
- `/check-ins` - Check-in management

### 7. Run tests

```bash
# Unit Tests
npm test

# Unit Tests in watch mode
npm run test:watch

# Unit Tests with coverage
npm run test:coverage

# Integration tests (E2E)
npm run test:e2e
```

## 🗄️ Database

### View data

```bash
# Prisma Studio - Visual interface for the database
npx prisma studio

# Access http://localhost:5555
```

### Useful Prisma commands

```bash
# Reset database (be careful in production!)
npx prisma migrate reset

# Deploy migrations
npx prisma migrate deploy

# Migration status
npx prisma migrate status
```
