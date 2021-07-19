import {Request, Response} from "express";
import BookModel from "../models/bookModel";

// get all books
export let getAllBooks = (req: Request, res: Response) => {
    let books = BookModel.find((err, books) => {
        if (err) {
            res.send(err);
        } else {
            res.send(books);
        }
    });
}

// get book by id
export let getBook = (req: Request, res: Response) => {
    let book = BookModel.findById(req.params.id, (err: any, book: any) => {
        if (err) {
            res.send(err);
        } else {
            res.send(book);
        }
    });
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
                res.send(book);
            }
        }
    );
};

// add book
// export let addBook = (req: Request, res: Response) => {
//     let book = new BookModel(req.body);
//
//     book.save((err: any) => {
//         if (err) {
//             res.send(err);
//         } else {
//             res.send(book);
//         }
//     });
// };

// export let addBook = async (req: Request, res: Response) => {
//     let book = new BookModel({
//         title: "My new book",
//         author: "My new author",
//         category: "My new category",
//         summary: "my new summary",
//         url: "My new url"
//     });
//
//     await book.save();
// };

export let addBook = async (req: Request, res: Response) => {
    console.log('request body', req.body);
    console.log('request', req);
    let book = new BookModel({
        title: "My new book 5",
        author: "My new author",
        category: "My new category",
        summary: "my new summary",
        url: "My new url"
    });

    await book.save();
};