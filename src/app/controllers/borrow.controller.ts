import express, { Request, Response } from "express"
import { Borrow } from "../models/borrow.model";
import { Book } from "../models/book.model";
export const borrowRouter = express.Router()





borrowRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { book, quantity, dueDate } = req.body;

    const existingBook = await Book.findById(book);
    if (!existingBook) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }

    if (existingBook.copies < quantity) {
      return res.status(400).json({ success: false, message: "Not enough copies available" });
    }

    // Use instance method instead of manual update
    await existingBook.updateAvailabilityAfterBorrow(quantity);

    const borrowRecord = new Borrow({ book, quantity, dueDate });
    const savedBorrow = await borrowRecord.save();

    return res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: savedBorrow,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to borrow book",
      error: (error as Error).message,
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

