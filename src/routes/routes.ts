import {Express} from "express";
import * as bookController from "../controllers/bookController";
import * as authorController from "../controllers/authorController";
import * as userController from "../controllers/userController";

export default function (app: Express) {
    app.get("/books", bookController.getAllBooks);
    app.get("/book/:id", bookController.getBook);
    app.post("/book", bookController.addBook);
    app.put("/book/:id", bookController.updateBook);
    app.delete("/book/:id", bookController.deleteBook);

    app.get("/booksByTitle/:title", bookController.getBooksByTitle);
    app.get("/booksByAuthor/:author", bookController.getBooksByAuthor);

    app.get("/authors", authorController.getAllAuthors);

    app.post("/user/signup", userController.createUser);
    app.delete("/user/:id", userController.deleteUser);
    app.post("/user/login", userController.login);
}