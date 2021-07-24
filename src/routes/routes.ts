import {Express} from "express";
import * as bookController from "../controllers/bookController";
import * as authorController from "../controllers/authorController";
import * as userController from "../controllers/userController";
import checkAuth from "../middleware/check-auth";
import verifyRole from "../middleware/auth-role";
import limitRequests from "../middleware/api-throttle";
import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});
const upload = multer({storage: storage});

export default function (app: Express) {
    app.get("/allBooks", checkAuth, verifyRole, bookController.getAllBooks);
    app.get("/book/:id", checkAuth, limitRequests, bookController.getBook);
    app.post("/book", checkAuth, verifyRole, bookController.addBook);
    app.put("/book/:id", checkAuth, verifyRole, bookController.updateBook);
    app.delete("/book/:id", checkAuth, verifyRole, bookController.deleteBook);

    app.get("/booksByTitle/:title", checkAuth, limitRequests, bookController.getBooksByTitle);
    app.get("/booksByAuthor/:author", checkAuth, limitRequests, bookController.getBooksByAuthor);

    app.get("/authors", checkAuth, verifyRole, authorController.getAllAuthors);

    app.post("/user/signup", userController.createUser);
    app.delete("/user/:id", checkAuth, verifyRole, userController.deleteUser);
    app.post("/user/login", userController.login);


    app.put("/books/book/:id", checkAuth, limitRequests, bookController.bookABook);
    app.put("/books/borrow/:id", checkAuth, verifyRole, bookController.borrow);

    app.get("/books", checkAuth, limitRequests, limitRequests, bookController.getAvailableBooks);

    app.get("/bookedBooks", checkAuth, limitRequests, bookController.getBookedBooks);
    app.get("/borrowedBooks", checkAuth, limitRequests, bookController.getBorrowedBooks);

    app.get("/bookedOrBorrowed", checkAuth, verifyRole, bookController.getBookedOrBorrowedBooks);

    app.post("/upload", upload.single('bookList'), bookController.uploadBooks);

}