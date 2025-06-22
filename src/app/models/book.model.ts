
import { model, Schema } from "mongoose";
import { IBook } from "../interfaces/book.interface";


// create schema
const bookSchema = new Schema<IBook>({
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    genre: {
        type: String,
        enum: ["SCIENCE", "BIOGRAPHY", "FANTASY", "PHILOSOPHY", "HISTORY", "POETRY", "FICTION"],
        required: true
    },
    description: { type: String, required: true, trim: true },
    copies: { type: Number, required: true, min: 0 },
    available: { type: Boolean, default: true }


}, {
    versionKey: false,
    timestamps: true
});

// create model
export const Book = model<IBook>("Book", bookSchema);