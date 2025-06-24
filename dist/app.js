"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("./app/controllers/book.controller");
const globalErrorHandler_1 = require("./middlewares/globalErrorHandler");
const borrow_controller_1 = __importDefault(require("./app/controllers/borrow.controller"));
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use("/api/books", book_controller_1.booksRouter);
app.use("/api/borrow", borrow_controller_1.default);
app.get("/", (req, res) => {
    res.send('Welcome to Library Management app');
});
// 404 Not Found Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
        error: {
            path: req.originalUrl,
            method: req.method,
        },
    });
});
// Global Error Handler
app.use(globalErrorHandler_1.globalErrorHandler);
exports.default = app;
