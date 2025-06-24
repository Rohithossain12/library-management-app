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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
// Create schema
const bookSchema = new mongoose_1.Schema({
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
bookSchema.methods.updateAvailabilityAfterBorrow = function (quantity) {
    return __awaiter(this, void 0, void 0, function* () {
        this.copies -= quantity;
        if (this.copies <= 0) {
            this.copies = 0;
            this.available = false;
        }
        else {
            this.available = true;
        }
        return this.save();
    });
};
// Create and export model
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
