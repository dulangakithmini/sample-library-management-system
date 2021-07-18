import {Request, Response} from "express";
import Book, {IBook} from "../models/bookModel";

// get all books
export let getAllBooks = (req: Request, res: Response) => {
    let books = Book.find((err, books) => {
        if (err) {
            res.send(err);
        } else {
            res.send(books);
        }
    })
}

// get book by id
export let getBook = (req: Request, res: Response) => {
    let book = Book.findById(req.params.id, (err: any, book: IBook) => {
        if (err) {
            res.send(err);
        } else {
            res.send(book);
        }
    })
}