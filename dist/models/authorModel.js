"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
const mongoose_1 = require("mongoose");
const AuthorSchema = new mongoose_1.Schema({
    _id: {type: mongoose_1.Schema.Types.ObjectId},
    name: {type: String, required: true},
});
const AuthorModel = mongoose_1.model("Author", AuthorSchema);
exports.default = AuthorModel;
