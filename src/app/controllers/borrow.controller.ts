import express, { NextFunction, Request, Response } from "express"
import { Borrow } from "../models/borrow.model";
import { Book } from "../models/book.model";
import { IBook } from "../interfaces/book.interface";
export const borrowRouter = express.Router();


borrowRouter.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const { book, quantity, dueDate } = req.body;

    if (!book || !quantity || !dueDate) {
      res.status(400).json({
        success: false,
        message: "Book ID, quantity, and due date are required",
      });
      return;
    }

    const duplicate = await Borrow.findOne({
      book,
      dueDate: new Date(dueDate),
    });

    if (duplicate) {
      res.status(409).json({
        success: false,
        message: "This book has already been borrowed for the same due date.",
      });
      return;
    }

    const existingBook = await Book.findById(book) as IBook;
    if (!existingBook) {
      res.status(404).json({
        success: false,
        message: "Book not found",
      });
      return;
    }

    if (existingBook.copies < quantity) {
      res.status(400).json({
        success: false,
        message: "Not enough copies available",
      });
      return;
    }

    await existingBook.updateAvailabilityAfterBorrow(quantity);

    const borrowRecord = new Borrow({ book, quantity, dueDate });
    const savedBorrow = await borrowRecord.save();

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: savedBorrow,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
});






// GET /api/borrow
borrowRouter.get("/", async (req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookDetails",
        },
      },
      {
        $unwind: "$bookDetails",
      },
      {
        $project: {
          _id: 0,
          book: {
            title: "$bookDetails.title",
            isbn: "$bookDetails.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summary,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve summary",
      error: (error as Error).message,
    });
  }
});

export default borrowRouter;