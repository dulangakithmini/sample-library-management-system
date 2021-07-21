"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
            resolve(value);
        });
    }

    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }

        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }

        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }

        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : {"default": mod};
};
Object.defineProperty(exports, "__esModule", {value: true});
exports.getBooksByAuthor = exports.getBooksByTitle = exports.addBook = exports.updateBook = exports.deleteBook = exports.getBook = exports.getAllBooks = void 0;
const bookModel_1 = __importDefault(require("../models/bookModel"));
// get all books
let getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let books = yield bookModel_1.default.find((err, books) => {
        if (err) {
            res.send(err);
        } else {
            res.send(books);
        }
    });
});
exports.getAllBooks = getAllBooks;
// get book by id
let getBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let book = yield bookModel_1.default.findById(req.params.id, (err, book) => {
        if (err) {
            res.send(err);
        } else {
            res.send(book);
        }
    });
});
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
            res.send('Updated successfully');
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
//filter by book title
let getBooksByTitle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let books = yield bookModel_1.default.find({title: req.params.title});
    res.send(books);
});
exports.getBooksByTitle = getBooksByTitle;
// filter by author
let getBooksByAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let books = yield bookModel_1.default.find({author: req.params.author});
    res.send(books);
});
exports.getBooksByAuthor = getBooksByAuthor;
// add book
// values are assigned to fields separately
// export let addBook = (req: Request, res: Response) => {
//     console.log('request body', req.body);
//     // console.log('request', req);
//     const book = new BookModel({
//         "title": req.body['title'],
//         "author": req.body['author'],
//         "category": req.body['category'],
//         "summary": req.body['summary'],
//         "url": req.body['url']
//     });
//
//     book.save((err: any) => {
//         if (err) {
//             res.send(err);
//         } else {
//             res.send(book);
//         }
//     });
// };
