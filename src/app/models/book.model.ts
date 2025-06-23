
import { model, Schema } from "mongoose";
import { IBook } from "../interfaces/book.interface";


// create schema
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
    console.log(`Book titled "${this.title}" is about to be saved.`);
    if (this.copies === 0) {
        this.available = false;
    }
    next();
});

// Post-save middleware
bookSchema.post("save", function (doc) {
    console.log(`Book titled "${doc.title}" was saved successfully.`);
});

// Pre-update middleware
bookSchema.pre("findOneAndUpdate", function (next) {
    console.log("About to update a book...");
    next();
});

// Post-find middleware
bookSchema.post("find", function (docs) {
    console.log(`Books found: ${docs.length}`);
});


// Instance Method 
bookSchema.methods.updateAvailabilityAfterBorrow = function (quantity: number) {
    this.copies -= quantity;
    if (this.copies <= 0) {
        this.copies = 0;
        this.available = false;
    } else {
        this.available = true;
    }
    return this.save();
};

// create model
export const Book = model<IBook>("Book", bookSchema);