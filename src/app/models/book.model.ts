import { model, Schema } from "mongoose";
import { IBook } from "../interfaces/book.interface";


// Create schema
const bookSchema = new Schema<IBook>({
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    genre: {
        type: String,
        enum: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
        required: true
    },
    isbn: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true, trim: true },
    copies: { type: Number, required: true, min: 0 },
    available: { type: Boolean, default: true }
}, {
    versionKey: false,
    timestamps: true
});

// Pre-save middleware
bookSchema.pre("save", function (next) {
    if (this.copies === 0) {
        this.available = false;
    }
    next();
});

// Post-save middleware
bookSchema.post("save", function (doc) {
    console.log(`Book titled "${doc.title}" was saved successfully.`);
});

// Instance method definition
bookSchema.methods.updateAvailabilityAfterBorrow = async function (
    quantity: number
): Promise<IBook> {
    this.copies -= quantity;
    if (this.copies <= 0) {
        this.copies = 0;
        this.available = false;
    } else {
        this.available = true;
    }
    return this.save();
};

// Create and export model
export const Book = model<IBook>("Book", bookSchema);
