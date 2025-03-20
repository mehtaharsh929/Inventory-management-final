# Inventory Management System

An Inventory Management System developed using **NestJS**, **TypeORM**, and **PostgreSQL**. It supports data conversion features apart from **CSV** and **PDF** and uses **Swagger** for API documentation.

---

## 🚀 Features
- Inventory management with products and categories.
- User authentication using JWT with role-based access (Admin and User).
- Data conversion apart from CSV and PDF.
- Integrated Swagger for API documentation.
- Uses **TypeORM** with PostgreSQL.
- Environment variables managed using **process.env**.
- Built with **Yarn** for dependency management.

---

## 🛠️ Technologies Used
- **NestJS** - Backend Framework
- **TypeORM** - ORM for PostgreSQL
- **PostgreSQL** - Relational Database
- **Swagger** - API Documentation
- **JWT** - Authentication
- **Yarn** - Package Manager
- **bcryptjs** - Password hashing

---

## 📦 Installation and Setup

### 1. Clone the repository:
git clone <repository-url>
cd inventory-management-system

## 2. Install dependencies:
yarn install

## 3. Set up environment variables:
Create a .env file in the root directory with the following configurations:
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_NAME=inventory_db
JWT_SECRET=your_jwt_secret

## 4. Database Setup:
Ensure PostgreSQL is running and the database (inventory_db) is created.

⚙️ Running the Application
Development Mode:

yarn start:dev
Production Mode:

yarn start:prod
Swagger Documentation:
Access http://localhost:3000/api for API documentation.

🛡️ Authentication & Authorization
JWT-based authentication.

Role-based access control (Admin and User).

🔧 Future Improvements
Advanced data analytics for inventory.
Enhanced error handling and validation.
Migration setup for production environments.
📜 License
This project is licensed under the MIT License.


