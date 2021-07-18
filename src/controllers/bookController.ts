import {Request, Response} from "express";
import Book from "../models/bookModel";

// get all books
export let getAllBooks = (req: Request, res: Response) => {
    let books = Book.find((err, books) => {
        if (err) {
            res.send("Error!");
        } else {
            res.send(books);
        }
    })
}