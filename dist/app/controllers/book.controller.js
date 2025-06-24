"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRouter = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../models/book.model");
exports.booksRouter = express_1.default.Router();
// Create book data
exports.booksRouter.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookData = req.body;
        const book = yield book_model_1.Book.create(bookData);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book,
        });
    }
    catch (error) {
        next(error);
    }
}));
// Get all books with filter, sort, limit
exports.booksRouter.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy, sort, limit } = req.query;
        const query = {};
        if (typeof filter === "string") {
            query.genre = filter.toUpperCase();
        }
        let sortByField = "createdAt";
        if (typeof sortBy === "string") {
            sortByField = sortBy;
        }
        let sortOrder = 1;
        if (typeof sort === "string") {
            sortOrder = sort.toLowerCase() === "desc" ? -1 : 1;
        }
        const sortObj = {};
        sortObj[sortByField] = sortOrder;
        const limitNum = typeof limit === "string" ? parseInt(limit, 10) : 10;
        const books = yield book_model_1.Book.find(query)
            .sort(sortObj)
            .limit(limitNum);
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books,
        });
    }
    catch (error) {
        next(error);
    }
}));
// Get specific book data
exports.booksRouter.get("/:bookId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bookId;
        const book = yield book_model_1.Book.findById(id);
        res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
            data: book,
        });
    }
    catch (error) {
        next(error);
    }
}));
// Update book
exports.booksRouter.put("/:bookId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bookId;
        const bookData = req.body;
        const book = yield book_model_1.Book.findByIdAndUpdate(id, bookData, { new: true });
        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: book,
        });
    }
    catch (error) {
        next(error);
    }
}));
// Delete book
exports.booksRouter.delete("/:bookId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bookId;
        yield book_model_1.Book.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: null,
        });
    }
    catch (error) {
        next(error);
    }
}));
