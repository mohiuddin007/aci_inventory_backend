# Inventory Management System (Barcode-Driven)

## 🚀 Project Overview

This is a **Barcode-Driven Inventory System** built with **NestJS** (Node.js framework) and **MongoDB Atlas**. The system allows users to:

- Scan product barcodes and fetch details from an external API.
- Manage products using a **Kanban board**.
- Perform **CRUD operations** on inventory.
- Authenticate users with **JWT-based authentication**.
- Access a **Swagger API Documentation**.

---

## 🛠️ Getting Started

Follow these steps to **clone, install dependencies, and run** this NestJS project.

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/mohiuddin007/aci_inventory_backend.git
cd aci_inventory_backend
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Set Up Environment Variables

Create a **.env** file in the root directory and add the following variables:

```env
PORT=3080
MONGODB_URL=<your-mongodb-atlas-connection-string>
JWT_SECRET=<your-jwt-secret>
```

Make sure to replace `<your-mongodb-atlas-connection-string>` with your actual **MongoDB Atlas URI**.

### 4️⃣ Run the Application

#### **For Development Mode:**

```sh
npm run start:dev
```

#### **For Production Mode:**

```sh
npm run build
npm run start:prod
```

The application should now be running at:

```
[https://aci-inventory-backend.onrender.com](https://aci-inventory-backend.onrender.com/)
```

---

## 📖 API Documentation (Swagger)

This project includes **Swagger** for API documentation.

- **Access Swagger UI:** [https://aci-inventory-backend.onrender.com/api/docs](https://aci-inventory-backend.onrender.com/api/docs)
- **API Authentication:** Bearer Token (JWT)

---

## 🔥 Features

✅ Barcode Scanning (Fetch product details from API)\
✅ Kanban Board for inventory management\
✅ RESTful APIs for product management\
✅ JWT-based Authentication (Login & Register)\
✅ MongoDB (Atlas) as the database\
✅ Swagger API Documentation

---


