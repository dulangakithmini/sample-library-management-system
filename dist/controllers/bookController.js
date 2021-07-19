"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : {"default": mod};
};
Object.defineProperty(exports, "__esModule", {value: true});
exports.addBook = exports.updateBook = exports.deleteBook = exports.getBook = exports.getAllBooks = void 0;
const bookModel_1 = __importDefault(require("../models/bookModel"));
// get all books
let getAllBooks = (req, res) => {
    let books = bookModel_1.default.find((err, books) => {
        if (err) {
            res.send(err);
        } else {
            res.send(books);
        }
    });
};
exports.getAllBooks = getAllBooks;
// get book by id
let getBook = (req, res) => {
    let book = bookModel_1.default.findById(req.params.id, (err, book) => {
        if (err) {
            res.send(err);
        } else {
            res.send(book);
        }
    });
};
exports.getBook = getBook;
// delete book by id
let deleteBook = (req, res) => {
    let book = bookModel_1.default.deleteOne({_id: req.params.id}, (err) => {
        if (err) {
            res.send(err);
        } else {
            res.send("Successfully Deleted Book");
        }
    });
};
exports.deleteBook = deleteBook;
// update book
let updateBook = (req, res) => {
    console.log(req.body);
    let book = bookModel_1.default.findByIdAndUpdate(req.params.id, req.body, (err, book) => {
        if (err) {
            res.send(err);
        } else {
            res.send("Successfully updated book!");
        }
    });
};
exports.updateBook = updateBook;
// add book
let addBook = (req, res) => {
    let book = new bookModel_1.default(req.body);
    book.save((err) => {
        if (err) {
            res.send(err);
        } else {
            res.send(book);
        }
    });
};
exports.addBook = addBook;
