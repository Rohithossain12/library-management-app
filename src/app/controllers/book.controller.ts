
import express, { Request, Response } from "express"
import { Book } from "../models/book.model";

export const booksRouter = express.Router()

// create book data
booksRouter.post("/", async (req: Request, res: Response) => {
    const bookData = req.body;
    const book = await Book.create(bookData)
    res.status(201).json({
        success: true,
        message: "Book created successfully",
        data: book
    })
})

// get all books
booksRouter.get("/", async (req: Request, res: Response) => {
    const books = await Book.find()

    res.status(201).json({
        success: true,
        message: "Books retrieved successfully",
        data: books
    })


})
// get single note
booksRouter.get("/:bookId", async (req: Request, res: Response) => {
    const id = req.params.bookId
    const book = await Book.findById(id)

    res.status(201).json({
        success: true,
        message: "Book retrieved successfully",
        data: book
    })


})
// updated specific book data
booksRouter.patch("/:bookId", async (req: Request, res: Response) => {
    const id = req.params.bookId;
    const bookData = req.body;
    const book = await Book.findByIdAndUpdate(id, bookData, { new: true })

    res.status(201).json({
        success: true,
        message: " Book updated successfully",
        data: book
    })


})




    // delete book data
    .delete("/:bookId", async (req: Request, res: Response) => {
        const id = req.params.bookId;
        const book = await Book.findByIdAndDelete(id)
        res.status(201).json({
            success: true,
            message: " Book deleted successfully",
            data: null
        })


    })
