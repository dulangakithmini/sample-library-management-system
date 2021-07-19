"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
const mongoose_1 = require("mongoose");
const BookSchema = new mongoose_1.Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    category: {type: String, required: true},
    summary: {type: String, required: true},
    url: {type: String, required: true},
});
const BookModel = mongoose_1.model("Book", BookSchema);
exports.default = BookModel;
