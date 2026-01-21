Architecture Overview

The system is built using a microservices architecture consisting of:

- Auth Service
- Product Service
- API Gateway

All client requests go through the API Gateway, which handles authentication and routing.

Key Design Decisions

- Microservices architecture was chosen to separate concerns and allow independent scaling.
- JWT authentication is handled at the API Gateway level to centralize security.
- MongoDB is used for flexibility and ease of schema evolution.
- Audit logging is implemented for stock updates to ensure traceability.
