"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
exports.AuthorSchema = void 0;
const mongoose_1 = require("mongoose");
exports.AuthorSchema = new mongoose_1.Schema({
    name: {type: String, required: true},
    // books: [{
    //     type: Schema.Types.ObjectId,
    //     ref: "Book",
    // }],
});
const AuthorModel = mongoose_1.model("Author", exports.AuthorSchema);
exports.default = AuthorModel;
