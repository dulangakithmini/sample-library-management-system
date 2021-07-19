import {Express} from "express";
import * as bookController from "../controllers/bookController";

export default function (app: Express) {
    app.get("/books", bookController.getAllBooks);
    app.get("/book/:id", bookController.getBook);
    app.post("/book", bookController.addBook);
    app.put("/book/:id", bookController.updateBook);
    app.delete("/book/:id", bookController.deleteBook);

    app.get("/booksByTitle/:title", bookController.getBooksByTitle);
}