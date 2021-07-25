import {Express} from "express";
import * as bookController from "../controllers/bookController";
import {upload} from "../utils/storage";
import * as authorController from "../controllers/authorController";
import * as userController from "../controllers/userController";
import checkAuth from "../middleware/check-auth";
import verifyRole from "../middleware/auth-role";
import limitRequests from "../middleware/api-throttle";
import checkStatus from "../middleware/check-user-status";

export default function (app: Express) {
    // book routes
    app.get("/allBooks", checkAuth, verifyRole, bookController.getAllBooks);
    app.get("/book/:id", checkAuth, limitRequests, checkStatus, bookController.getBook);
    app.post("/book", checkAuth, verifyRole, bookController.addBook);
    app.put("/book/:id", checkAuth, verifyRole, bookController.updateBook);
    app.delete("/book/:id", checkAuth, verifyRole, bookController.deleteBook);

    // book filter routes
    app.get("/booksByTitle/:title", checkAuth, limitRequests, checkStatus, bookController.getBooksByTitle);
    app.get("/booksByAuthor/:author", checkAuth, limitRequests, checkStatus, bookController.getBooksByAuthor);

    // book borrow and book
    app.put("/books/book/:id", checkAuth, limitRequests, checkStatus, bookController.bookABook);
    app.put("/books/borrow/:id", checkAuth, verifyRole, bookController.borrow);

    // get available books
    app.get("/books", checkAuth, limitRequests, checkStatus, bookController.getAvailableBooks);

    // get booked and borrowed books - user
    app.get("/bookedBooks", checkAuth, limitRequests, checkStatus, bookController.getBookedBooks);
    app.get("/borrowedBooks", checkAuth, limitRequests, checkStatus, bookController.getBorrowedBooks);

    // get all booked and borrowed books - admin
    app.get("/bookedOrBorrowed", checkAuth, verifyRole, bookController.getBookedOrBorrowedBooks);

    // upload book file and add
    app.post("/upload", checkAuth, verifyRole, upload.single('bookList'), bookController.uploadBooks);
    app.post("/bookList", checkAuth, verifyRole, bookController.addBookList);


    // user routes
    app.post("/user/signup", userController.createUser);
    app.delete("/user/:id", checkAuth, verifyRole, userController.deleteUser);
    app.post("/user/login", userController.login);
    app.put("/user/activate", userController.activateUser);


    // author routes
    app.get("/authors", checkAuth, verifyRole, authorController.getAllAuthors);
    app.get("/author/:id", checkAuth, verifyRole, authorController.getAuthor);
    app.delete("/author/:id", checkAuth, verifyRole, authorController.deleteAuthor);
    app.put("/author/:id", checkAuth, verifyRole, authorController.updateAuthor);
    app.post("/author", checkAuth, verifyRole, authorController.addAuthor);
    app.get("/authorByName/:name", checkAuth, verifyRole, authorController.getAuthorByName);
}