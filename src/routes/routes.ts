import {Express} from "express";
import * as bookController from "../controllers/bookController";
import * as authorController from "../controllers/authorController";
import * as userController from "../controllers/userController";
import checkAuth from "../middleware/check-auth";

export default function (app: Express) {
    app.get("/books", checkAuth, bookController.getAllBooks);
    app.get("/book/:id", checkAuth, bookController.getBook);
    app.post("/book", checkAuth, bookController.addBook);
    app.put("/book/:id", checkAuth, bookController.updateBook);
    app.delete("/book/:id", checkAuth, bookController.deleteBook);

    app.get("/booksByTitle/:title", checkAuth, bookController.getBooksByTitle);
    app.get("/booksByAuthor/:author", checkAuth, bookController.getBooksByAuthor);

    app.get("/authors", checkAuth, authorController.getAllAuthors);

    app.post("/user/signup", userController.createUser);
    app.delete("/user/:id", checkAuth, userController.deleteUser);
    app.post("/user/login", userController.login);
}