"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const globalErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    if (err instanceof mongoose_1.default.Error.ValidationError) {
        res.status(400).json({
            success: false,
            message: "Validation failed",
            error: err,
        });
        return;
    }
    res.status(statusCode).json({
        success: false,
        message: err.message || "Something went wrong",
        error: err,
    });
};
exports.globalErrorHandler = globalErrorHandler;
