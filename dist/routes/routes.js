"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, {
        enumerable: true, get: function () {
            return m[k];
        }
    });
}) : (function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function (o, v) {
    Object.defineProperty(o, "default", {enumerable: true, value: v});
}) : function (o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : {"default": mod};
};
Object.defineProperty(exports, "__esModule", {value: true});
const bookController = __importStar(require("../controllers/bookController"));
const storage_1 = require("../utils/storage");
const authorController = __importStar(require("../controllers/authorController"));
const userController = __importStar(require("../controllers/userController"));
const check_auth_1 = __importDefault(require("../middleware/check-auth"));
const auth_role_1 = __importDefault(require("../middleware/auth-role"));
const api_throttle_1 = __importDefault(require("../middleware/api-throttle"));
const check_user_status_1 = __importDefault(require("../middleware/check-user-status"));
function default_1(app) {
    // book routes
    app.get("/allBooks", check_auth_1.default, auth_role_1.default, bookController.getAllBooks);
    app.get("/book/:id", check_auth_1.default, api_throttle_1.default, check_user_status_1.default, bookController.getBook);
    app.post("/book", check_auth_1.default, auth_role_1.default, bookController.addBook);
    app.put("/book/:id", check_auth_1.default, auth_role_1.default, bookController.updateBook);
    app.delete("/book/:id", check_auth_1.default, auth_role_1.default, bookController.deleteBook);
    // book filter routes
    app.get("/booksByTitle/:title", check_auth_1.default, api_throttle_1.default, check_user_status_1.default, bookController.getBooksByTitle);
    app.get("/booksByAuthor/:id", check_auth_1.default, api_throttle_1.default, check_user_status_1.default, bookController.getBooksByAuthor);
    // book borrow and book
    app.put("/books/book/:id", check_auth_1.default, api_throttle_1.default, check_user_status_1.default, bookController.bookABook);
    app.put("/books/borrow/:id", check_auth_1.default, auth_role_1.default, bookController.borrow);
    // get available books
    app.get("/books", check_auth_1.default, api_throttle_1.default, check_user_status_1.default, bookController.getAvailableBooks);
    // get booked and borrowed books - user
    app.get("/bookedBooks", check_auth_1.default, api_throttle_1.default, check_user_status_1.default, bookController.getBookedBooks);
    app.get("/borrowedBooks", check_auth_1.default, api_throttle_1.default, check_user_status_1.default, bookController.getBorrowedBooks);
    // get all booked and borrowed books - admin
    app.get("/bookedOrBorrowed", check_auth_1.default, auth_role_1.default, bookController.getBookedOrBorrowedBooks);
    // upload book file and add
    app.post("/upload", check_auth_1.default, auth_role_1.default, storage_1.upload.single('bookList'), bookController.uploadBooks);
    app.post("/bookList", check_auth_1.default, auth_role_1.default, bookController.addBookList);
    // user routes
    app.post("/user/signup", userController.createUser);
    app.delete("/user/:id", check_auth_1.default, auth_role_1.default, userController.deleteUser);
    app.post("/user/login", userController.login);
    app.put("/user/activate", userController.activateUser);
    // author routes
    app.get("/authors", check_auth_1.default, auth_role_1.default, authorController.getAllAuthors);
    app.get("/author/:id", check_auth_1.default, auth_role_1.default, authorController.getAuthor);
    app.delete("/author/:id", check_auth_1.default, auth_role_1.default, authorController.deleteAuthor);
    app.put("/author/:id", check_auth_1.default, auth_role_1.default, authorController.updateAuthor);
    app.post("/author", check_auth_1.default, auth_role_1.default, authorController.addAuthor);
    app.get("/authorByName/:name", check_auth_1.default, auth_role_1.default, authorController.getAuthorByName);
}
exports.default = default_1;
