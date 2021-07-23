"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
exports.BookSchema = void 0;
const mongoose_1 = require("mongoose");
exports.BookSchema = new mongoose_1.Schema({
    title: {type: String, required: true},
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Author',
        required: true,
    },
    category: {type: String, required: true},
    summary: {type: String, required: true},
    isBooked: {type: Boolean, default: false},
    isBorrowed: {type: Boolean, default: false},
    bookedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
    borrowedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
}, {
    timestamps: true,
});
const BookModel = mongoose_1.model("Book", exports.BookSchema);
exports.default = BookModel;
