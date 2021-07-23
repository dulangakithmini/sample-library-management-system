import {Express} from "express";
import * as bookController from "../controllers/bookController";
import * as authorController from "../controllers/authorController";
import * as userController from "../controllers/userController";
import checkAuth from "../middleware/check-auth";
import verifyRole from "../middleware/auth-role";

export default function (app: Express) {
    app.get("/allBooks", checkAuth, verifyRole, bookController.getAllBooks);
    app.get("/book/:id", checkAuth, bookController.getBook);
    app.post("/book", checkAuth, verifyRole, bookController.addBook);
    app.put("/book/:id", checkAuth, verifyRole, bookController.updateBook);
    app.delete("/book/:id", checkAuth, verifyRole, bookController.deleteBook);

    app.get("/booksByTitle/:title", checkAuth, bookController.getBooksByTitle);
    app.get("/booksByAuthor/:author", checkAuth, bookController.getBooksByAuthor);

    app.get("/authors", checkAuth, verifyRole, authorController.getAllAuthors);

    app.post("/user/signup", userController.createUser);
    app.delete("/user/:id", checkAuth, verifyRole, userController.deleteUser);
    app.post("/user/login", userController.login);


    app.put("/books/book/:id", checkAuth, bookController.bookABook);
    app.put("/books/borrow/:id", checkAuth, verifyRole, bookController.borrow);

    app.get("/books", checkAuth, bookController.getAvailableBooks);

    app.get("/bookedBooks", checkAuth, bookController.getBookedBooks);
    app.get("/borrowedBooks", checkAuth, bookController.getBorrowedBooks);
}