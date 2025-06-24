"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Borrow = void 0;
const mongoose_1 = require("mongoose");
const borrowSchema = new mongoose_1.Schema({
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Book",
        required: true,
    },
    quantity: {
        type: Number,
        min: [1, "At least 1 book must be borrowed"],
        required: [true, "Borrow quantity is required"],
        validate: {
            validator: Number.isInteger,
            message: "Quantity must be an integer"
        }
    },
    dueDate: {
        type: Date,
        required: [true, "Due date is required"],
        validate: {
            validator: function (value) {
                return value > new Date();
            },
            message: "Due date must be a future date"
        }
    }
}, {
    versionKey: false,
    timestamps: true
});
exports.Borrow = (0, mongoose_1.model)("Borrow", borrowSchema);
