import {Request, Response} from "express";
import BookModel from "../models/bookModel";

// get all books
export let getAllBooks = async (req: Request, res: Response): Promise<void> => {
    let books = await BookModel.find((err, books) => {
        if (err) {
            res.send(err);
        } else {
            res.send(books);
        }
    });
}

// get book by id
export let getBook = async (req: Request, res: Response): Promise<void> => {
    let book = await BookModel.findById(req.params.id, (err: any, book: any) => {
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