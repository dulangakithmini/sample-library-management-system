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
exports.borrow = exports.bookABook = exports.getBooksByAuthor = exports.getBooksByTitle = exports.addBook = exports.updateBook = exports.deleteBook = exports.getBook = exports.getAllBooks = void 0;
const bookModel_1 = __importDefault(require("../models/bookModel"));
// get all books
let getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let books = yield bookModel_1.default.find()
            .populate('author')
            .populate('bookedBy')
            .populate('borrowedBy');
        res.send(books);
    } catch (_a) {
        console.error("Error!");
    }
});
exports.getAllBooks = getAllBooks;
// get book by id
let getBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let book = yield bookModel_1.default.findById(req.params.id)
            .populate('author')
            .populate('bookedBy', 'email')
            .populate('borrowedBy', 'email');
        res.send(book);
    } catch (_b) {
        console.error("Error!");
    }
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
// book books
let bookABook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let book = yield bookModel_1.default.findById(req.params.id);
        if (!book) {
            res.send("Error!");
            return;
        }
        let isBooked = !book.isBooked;
        if (isBooked) {
            yield bookModel_1.default.findByIdAndUpdate(req.params.id, {
                isBooked: isBooked,
                bookedBy: req.userData.userId
            });
            res.send('Booked Successfully!');
        } else {
            yield bookModel_1.default.findByIdAndUpdate(req.params.id, {isBooked: isBooked, bookedBy: undefined});
            res.send('Cancelled the booking!');
        }
    } catch (err) {
        res.send(err);
    }
});
exports.bookABook = bookABook;
// borrow books
let borrow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let book = yield bookModel_1.default.findById(req.params.id);
        if (!book) {
            res.send("Error!");
            return;
        }
        let isBorrowed = !book.isBorrowed;
        if (isBorrowed) {
            yield bookModel_1.default.findByIdAndUpdate(req.params.id, {
                isBorrowed: isBorrowed,
                borrowedBy: req.userData.userId,
                isBooked: false,
                bookedBy: undefined
            });
            res.send('Borrowed the book!');
        } else {
            yield bookModel_1.default.findByIdAndUpdate(req.params.id, {isBorrowed: isBorrowed, borrowedBy: undefined});
            res.send('Returned the book');
        }
    } catch (err) {
        res.send(err);
    }
});
exports.borrow = borrow;
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
