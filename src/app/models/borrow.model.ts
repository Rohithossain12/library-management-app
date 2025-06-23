import { model, Schema } from "mongoose";
import { IBorrow } from "../interfaces/borrow.interface";


const borrowSchema = new Schema<IBorrow>({
    book: {
        type: Schema.Types.ObjectId,
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
            validator: function (value: Date) {
                return value > new Date();
            },
            message: "Due date must be a future date"
        }
    }
}, {
    versionKey: false,
    timestamps: true
})


export const Borrow = model<IBorrow>("Borrow", borrowSchema)