# E-Commerce Application

This project is a full-stack e-commerce application that demonstrates the integration of monolithic and microservices architecture on the back-end and a React-based front-end. Below is an overview of the key features and technologies.

---

## Back-End: Node.js and Microservices

### Features
1. **Monolithic Core**:
   - User Management: Registration, login, and profile updates.
   - Product Management: CRUD operations for products.
   - Error Handling and Logging.

2. **Microservices**:
   - Payment Service: Processes payments independently.
   - Billing Service: Generates invoices post-payment.
   - **Kafka**: Ensures asynchronous communication between services.

3. **Database**:
   - **MongoDB**: Stores users and products.
   - **Redis**: Implements caching for better performance.

4. **Deployment**:
   - **Docker**: Containers for all services.
   - **Kafka**: Facilitates inter-service messaging.

5. **Security**:
   - **JWT Authentication**: Secures APIs with token-based authentication.

---

## Front-End: React

### Features
1. **User Features**:
   - Registration/Login forms.
   - Profile page for updating user details.

2. **Product Management**:
   - Product List: Displays products with name, description, price, and image.
   - Filters/Sorting: Allows filtering by category or price.
   - Add to Cart: Adds products to the cart.

3. **Shopping Cart**:
   - View, update, and remove items.
   - Display the total price of products.

4. **Payment**:
   - Simple payment form integrated with the payment microservice.

5. **Security**:
   - JWT Authentication for access control.

---

## Installation and Setup

### Prerequisites
- Node.js
- Docker
- MongoDB
- Redis
- Kafka

### Back-End Setup
1. Clone the repository and navigate to the back-end directory:
   ```bash
   git clone <repo-url>
   cd backend
2. Install dependencies:
   npm install
3. Start services with Docker:
   docker-compose up

### Front-End Setup
1. Navigate to the front-end directory:
   cd backend
2. Install dependencies:
   npm install
3. Start the React application:
   npm start

## Technologies Used

### Back-End
- Node.js
- Express.js
- MongoDB
- Redis
- Docker
- Kafka

### Front-End
- React
- React Router
- Axios

### Authentication
- JSON Web Tokens (JWT)

---

## Contributing

Contributions are welcome!  
Feel free to submit a pull request or open an issue to improve the project.
