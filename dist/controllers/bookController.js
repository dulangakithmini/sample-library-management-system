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
exports.addBookList = exports.uploadBooks = exports.getBookedOrBorrowedBooks = exports.getBorrowedBooks = exports.getBookedBooks = exports.getAvailableBooks = exports.borrow = exports.bookABook = exports.getBooksByAuthor = exports.getBooksByTitle = exports.addBook = exports.updateBook = exports.deleteBook = exports.getBook = exports.getAllBooks = void 0;
const bookModel_1 = __importDefault(require("../models/bookModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const bookList = require('../../uploads/books.json');
// get all books
let getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let books = yield bookModel_1.default.find()
            .populate('author')
            .populate('bookedBy', 'email')
            .populate('borrowedBy', 'email');
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
            .select('_id title author category summary')
            .populate('author', 'name')
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
    bookModel_1.default.deleteOne({_id: req.params.id}, (err) => {
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
    bookModel_1.default.findByIdAndUpdate(req.params.id, req.body, (err, book) => {
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
    let books = yield bookModel_1.default.find({
        title: req.params.title,
        isBooked: false,
        isBorrowed: false
    })
        .select('_id title author category summary');
    res.send(books);
});
exports.getBooksByTitle = getBooksByTitle;
// filter by author
let getBooksByAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let books = yield bookModel_1.default.find({
        author: req.params.id, isBooked: false,
        isBorrowed: false
    })
        .select('_id title author category summary');
    res.send(books);
});
exports.getBooksByAuthor = getBooksByAuthor;
// book books
let bookABook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // books that are booked or borrowed by the particular user
        let books = yield bookModel_1.default.find({
            $or: [
                {bookedBy: req.userData.userId},
                {borrowedBy: req.userData.userId}
            ]
        });
        let book = yield bookModel_1.default.findById(req.params.id);
        if (!book) {
            res.send("Error!");
            return;
        }
        let isBooked = !book.isBooked;
        if (isBooked) {
            if (books.length < 2) {
                yield bookModel_1.default.findByIdAndUpdate(req.params.id, {
                    isBooked: isBooked,
                    bookedBy: req.userData.userId
                });
                res.send('Booked Successfully!');
            } else {
                res.send("Cannot get more than 2 books!");
                return;
            }
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
        // find the user and check whether the user is active
        const user = yield userModel_1.default.findById(req.body.id);
        if (!user) {
            res.send("Not a registered user!");
            return;
        }
        if (user.isActive) {
            // find the book
            let book = yield bookModel_1.default.findById(req.params.id);
            if (!book) {
                res.send("Error!");
                return;
            }
            let isBorrowed = !book.isBorrowed;
            if (isBorrowed) {
                // check whether the book is booked by another user
                if (book.bookedBy != req.body.id && book.isBooked) {
                    res.send('Cannot borrow. Already booked by another user!');
                } else {
                    yield bookModel_1.default.findByIdAndUpdate(req.params.id, {
                        isBorrowed: isBorrowed,
                        borrowedBy: req.body.id,
                        isBooked: false,
                        bookedBy: undefined,
                        borrowedTime: new Date()
                    });
                    res.send(`User ${req.body.id} borrowed the book!`);
                }
            } else {
                yield bookModel_1.default.findByIdAndUpdate(req.params.id, {
                    isBorrowed: isBorrowed,
                    borrowedBy: undefined,
                    borrowedTime: undefined,
                    overDue: false
                });
                res.send(`User ${req.body.id} returned the book!`);
            }
        } else {
            res.send('User is suspended. Cannot borrow books!');
            return;
        }
    } catch (err) {
        res.send(err);
    }
});
exports.borrow = borrow;
// get available books (not booked & not borrowed)
let getAvailableBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let books = yield bookModel_1.default.find({isBooked: false, isBorrowed: false})
            .select('_id title author category summary')
            .populate('author');
        res.send(books);
    } catch (_c) {
        console.error("Error!");
    }
});
exports.getAvailableBooks = getAvailableBooks;
// get booked books - user
let getBookedBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let books = yield bookModel_1.default.find({bookedBy: req.userData.userId})
            .select('_id title author category summary')
            .populate('author');
        res.send(books);
    } catch (_d) {
        console.error("Error!");
    }
});
exports.getBookedBooks = getBookedBooks;
// get borrowed books - user
let getBorrowedBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let books = yield bookModel_1.default.find({borrowedBy: req.userData.userId})
            .select('_id title author category summary borrowedTime overDue')
            .populate('author');
        res.send(books);
    } catch (_e) {
        console.error("Error!");
    }
});
exports.getBorrowedBooks = getBorrowedBooks;
// get booked and borrowed books - admin
let getBookedOrBorrowedBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let books = yield bookModel_1.default.find({
            $or: [
                {isBooked: true},
                {isBorrowed: true}
            ]
        })
            .populate('author')
            .populate('bookedBy', 'email')
            .populate('borrowedBy', 'email');
        res.send(books);
    } catch (_f) {
        console.error("Error!");
    }
});
exports.getBookedOrBorrowedBooks = getBookedOrBorrowedBooks;
// upload books file
let uploadBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('Uploaded successfully.');
});
exports.uploadBooks = uploadBooks;
// add books from the uploaded json file
let addBookList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield bookModel_1.default.insertMany(bookList);
    res.send('Book list added.');
});
exports.addBookList = addBookList;
