import {Request, Response} from "express";
import BookModel from "../models/bookModel";

const bookList = require('../../uploads/books.json');

interface bookBookingRequest extends Request {
    readonly userData: {
        userId: String,
        email: String,
        role: String
    }
}

// get all books
export let getAllBooks = async (req: Request, res: Response): Promise<void> => {
    try {
        let books = await BookModel.find()
            .populate('author')
            .populate('bookedBy', 'email')
            .populate('borrowedBy', 'email');
        res.send(books);
    } catch {
        console.error("Error!");
    }
}

// get book by id
export let getBook = async (req: Request, res: Response): Promise<void> => {
    try {
        let book = await BookModel.findById(req.params.id)
            .populate('author')
            .populate('bookedBy', 'email')
            .populate('borrowedBy', 'email');
        res.send(book);
    } catch {
        console.error("Error!");
    }
}

// delete book by id
export let deleteBook = (req: Request, res: Response) => {
    let book = BookModel.deleteOne({_id: req.params.id}, (err: any) => {
        if (err) {
            res.send(err);
        } else {
            res.send("Successfully Deleted Book");
        }
    });
};

// update book
export let updateBook = (req: Request, res: Response) => {
    console.log(req.body);
    let book = BookModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        (err: any, book: any) => {
            if (err) {
                res.send(err);
            } else {
                res.send('Updated successfully');
            }
        }
    );
};

// add book
export let addBook = (req: Request, res: Response) => {
    let book = new BookModel(req.body);

    book.save((err: any) => {
        if (err) {
            res.send(err);
        } else {
            res.send(book);
        }
    });
};

//filter by book title
export let getBooksByTitle = async (req: Request, res: Response): Promise<void> => {
    let books = await BookModel.find({title: req.params.title});
    res.send(books);
}

// filter by author
export let getBooksByAuthor = async (req: Request, res: Response): Promise<void> => {
    let books = await BookModel.find({author: req.params.author});
    res.send(books);
}

// book books
export let bookABook = async (req: any, res: Response): Promise<void> => {
    try {
        // books that are booked or borrowed by the particular user
        let books = await BookModel.find({
            $or: [
                {bookedBy: req.userData.userId},
                {borrowedBy: req.userData.userId}
            ]
        });

        let book = await BookModel.findById(req.params.id);

        if (!book) {
            res.send("Error!");
            return;
        }

        let isBooked = !book.isBooked;
        if (isBooked) {
            if (books.length < 2) {
                await BookModel.findByIdAndUpdate(req.params.id, {isBooked: isBooked, bookedBy: req.userData.userId});
                res.send('Booked Successfully!');
            } else {
                res.send("Cannot get more than 2 books!");
                return;
            }
        } else {
            await BookModel.findByIdAndUpdate(req.params.id, {isBooked: isBooked, bookedBy: undefined});
            res.send('Cancelled the booking!');
        }
    } catch (err) {
        res.send(err);
    }
}

// borrow books
export let borrow = async (req: any, res: Response): Promise<void> => {
    try {
        let book = await BookModel.findById(req.params.id);

        if (!book) {
            res.send("Error!");
            return;
        }

        let isBorrowed = !book.isBorrowed;
        if (isBorrowed) {
            await BookModel.findByIdAndUpdate(req.params.id, {
                isBorrowed: isBorrowed,
                borrowedBy: req.body.id,
                isBooked: false,
                bookedBy: undefined,
                borrowedTime: new Date()
            });
            res.send(`User ${req.body.id} borrowed the book!`);
        } else {
            await BookModel.findByIdAndUpdate(req.params.id, {isBorrowed: isBorrowed, borrowedBy: undefined});
            res.send(`User ${req.body.id} returned the book!`);
        }
    } catch (err) {
        res.send(err);
    }
}

// get available books (not booked & not borrowed)
export let getAvailableBooks = async (req: Request, res: Response): Promise<void> => {
    try {
        let books = await BookModel.find({isBooked: false, isBorrowed: false})
            .populate('author');
        res.send(books);
    } catch {
        console.error("Error!");
    }
}

// get booked books - user
export let getBookedBooks = async (req: any, res: Response): Promise<void> => {
    try {
        let books = await BookModel.find({bookedBy: req.userData.userId})
            .populate('author')
        res.send(books);
    } catch {
        console.error("Error!");
    }
}

// get borrowed books - user
export let getBorrowedBooks = async (req: any, res: Response): Promise<void> => {
    try {
        let books = await BookModel.find({borrowedBy: req.userData.userId})
            .populate('author')
        res.send(books);
    } catch {
        console.error("Error!");
    }
}

// get booked and borrowed books - admin
export let getBookedOrBorrowedBooks = async (req: any, res: Response): Promise<void> => {
    try {
        let books = await BookModel.find({
            $or: [
                {isBooked: true},
                {isBorrowed: true}
            ]
        })
            .populate('author')
            .populate('bookedBy', 'email')
            .populate('borrowedBy', 'email');
        res.send(books);
    } catch {
        console.error("Error!");
    }
}

// upload books file
export let uploadBooks = async (req: any, res: Response) => {
    res.send('Uploaded successfully.')
};

// add books from the uploaded json file
export let addBookList = async (req: any, res: Response) => {
    await BookModel.insertMany(bookList);
    res.send('Book list added.')
};