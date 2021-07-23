import {Request, Response} from "express";
import BookModel from "../models/bookModel";

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
            .populate('bookedBy')
            .populate('borrowedBy');
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
        let book = await BookModel.findById(req.params.id);

        if (!book) {
            res.send("Error!");
            return;
        }

        let isBooked = !book.isBooked;
        if (isBooked) {
            await BookModel.findByIdAndUpdate(req.params.id, {isBooked: isBooked, bookedBy: req.userData.userId});
            res.send('Booked Successfully!');
        } else {
            await BookModel.findByIdAndUpdate(req.params.id, {isBooked: isBooked});
            res.send('Cancelled the booking!');
        }
    } catch (err) {
        res.send(err);
    }
}

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