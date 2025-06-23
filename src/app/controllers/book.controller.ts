import express, { Request, Response } from "express";
import { Book } from "../models/book.model";

export const booksRouter = express.Router();

// Create book data
booksRouter.post("/", async (req: Request, res: Response, next) => {
    try {
        const bookData = req.body;
        const book = await Book.create(bookData);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book,
        });
    } catch (error) {
        next(error)
    }
});

// Get all books
booksRouter.get("/", async (req: Request, res: Response, next) => {
    try {
        const books = await Book.find();
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books,
        });
    } catch (error) {
        (next)
    }
});

// Get specific book data
booksRouter.get("/:bookId", async (req: Request, res: Response, next) => {
    try {
        const id = req.params.bookId;
        const book = await Book.findById(id);
        res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
            data: book,
        });
    } catch (error) {
        next(error)
    }
});

// Update book
booksRouter.put("/:bookId", async (req: Request, res: Response, next) => {
    try {
        const id = req.params.bookId;
        const bookData = req.body;
        const book = await Book.findByIdAndUpdate(id, bookData, { new: true });
        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: book,
        });
    } catch (error) {
        next(error)
    }
});

// Delete book
booksRouter.delete("/:bookId", async (req: Request, res: Response, next) => {
    try {
        const id = req.params.bookId;
        await Book.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: null,
        });
    } catch (error) {
        next(error)
    }
});
