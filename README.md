

---


```md
# 📚 Library Management API

A RESTful API for managing library books and borrow functionality. Built with **Node.js**, **Express**, **TypeScript**, and **MongoDB** using Mongoose ODM.

---

## 🚀 Features

- 📖 Add, update, delete, and fetch books
- 📦 Borrow books with due date and availability checks
- 🔄 Automatically update available copies after borrow
- 🚫 Prevent duplicate borrowing on same due date
- 📊 Borrow summary using MongoDB Aggregation
- ✅ Global error handler
- 🧪 Query support: filter, sort, limit

---

## 🛠️ Tech Stack

- **Backend Framework**: Node.js + Express
- **Language**: TypeScript
- **Database**: MongoDB Atlas
- **ODM**: Mongoose
- **Environment Management**: dotenv

---

## 📁 Project Structure

```

library-management/
├── app/
│   ├── controllers/
│   │   ├── book.controller.ts
│   │   └── borrow\.controller.ts
│   ├── models/
│   │   ├── book.model.ts
│   │   └── borrow\.model.ts
│   ├── interfaces/
│   │   ├── book.interface.ts
│   │   └── borrow\.interface.ts
│
├── middlewares/
│   └── globalErrorHandler.ts
│
├── app.ts
├── server.ts
└── .env

```


## 🧪 API Endpoints

### 📘 Book Routes

| Method | Endpoint           | Description                  |
|--------|--------------------|------------------------------|
| POST   | `/api/books`       | Add a new book               |
| GET    | `/api/books`       | Get all books (filterable)   |
| GET    | `/api/books/:id`   | Get book by ID               |
| PUT    | `/api/books/:id`   | Update a book                |
| DELETE | `/api/books/:id`   | Delete a book                |

---

### 📦 Borrow Routes

| Method | Endpoint          | Description                       |
|--------|-------------------|-----------------------------------|
| POST   | `/api/borrow`     | Borrow a book                     |
| GET    | `/api/borrow`     | Get borrow summary (aggregate)    |

---

## 🌐 Live Demo

🔗 [Click here to visit the live API](#)  
<!-- Replace # with your actual link -->

```

---

