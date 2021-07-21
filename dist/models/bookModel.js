"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : {"default": mod};
};
Object.defineProperty(exports, "__esModule", {value: true});
const mongoose_1 = require("mongoose");
const authorModel_1 = __importDefault(require("./authorModel"));
const BookSchema = new mongoose_1.Schema({
    title: {type: String, required: true},
    author: [{
        id: {
            type: mongoose_1.Schema.Types.ObjectId,
        },
        name: {
            type: String
        },
        ref: authorModel_1.default,
    }],
    category: {type: String, required: true},
    summary: {type: String, required: true},
    url: {type: String, required: true},
}, {
    timestamps: true,
});
const BookModel = mongoose_1.model("Book", BookSchema);
exports.default = BookModel;
