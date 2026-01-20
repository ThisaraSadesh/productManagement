# Microservices Architecture

This project has been restructured into a microservices architecture with the following components:

## Services

### 1. API Gateway (Port 3000)
- Entry point for all client requests
- Routes requests to appropriate microservices
- Handles authentication middleware
- Location: `api-gateway/`

### 2. Auth Service (Port 3001)
- Handles user registration and authentication
- Manages JWT token generation
- Independent database: `authDB`
- Location: `auth-service/`

### 3. Product Service (Port 3002)
- Manages product CRUD operations
- Handles stock management and logging
- Independent database: `productDB`
- Location: `product-service/`

## Getting Started

### Installation

Install dependencies for each service:

```bash
# Install auth-service dependencies
cd auth-service
npm install

# Install product-service dependencies
cd ../product-service
npm install

# Install api-gateway dependencies
cd ../api-gateway
npm install
```

### Running the Services

You need to run all three services simultaneously. Open three separate terminals:

**Terminal 1 - Auth Service:**
```bash
cd auth-service
npm start
```

**Terminal 2 - Product Service:**
```bash
cd product-service
npm start
```

**Terminal 3 - API Gateway:**
```bash
cd api-gateway
npm start
```

## API Endpoints

All requests go through the API Gateway at `http://localhost:3000`

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and get JWT token

### Products (Requires Authentication)
- `GET /products` - Fetch all products
- `POST /products` - Add a new product
- `POST /products/update` - Update a product

### Stock (Requires Authentication)
- `POST /stock/update` - Update product stock

## Environment Variables

Each service has its own `.env` file with the following structure:

**auth-service/.env**
- `PORT=3001`
- `MONGODB_URI` - MongoDB connection for auth database
- `JWT_SECRET_KEY` - Secret key for JWT tokens
- `TOKEN_HEADER_KEY` - Header key for authorization

**product-service/.env**
- `PORT=3002`
- `MONGODB_URI` - MongoDB connection for product database
- `JWT_SECRET_KEY` - Same as auth service
- `TOKEN_HEADER_KEY` - Header key for authorization

**api-gateway/.env**
- `PORT=3000`
- `AUTH_SERVICE_URL=http://localhost:3001`
- `PRODUCT_SERVICE_URL=http://localhost:3002`
- `JWT_SECRET_KEY` - Same as other services
- `TOKEN_HEADER_KEY` - Header key for authorization

## Architecture Benefits

- **Independence**: Each service can be developed, deployed, and scaled independently
- **Database Separation**: Each service has its own database
- **Service Isolation**: Failures in one service don't affect others
- **Scalability**: Services can be scaled independently based on demand
