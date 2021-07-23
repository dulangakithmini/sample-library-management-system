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
const authorController = __importStar(require("../controllers/authorController"));
const userController = __importStar(require("../controllers/userController"));
const check_auth_1 = __importDefault(require("../middleware/check-auth"));
const auth_role_1 = __importDefault(require("../middleware/auth-role"));

function default_1(app) {
    app.get("/books", check_auth_1.default, bookController.getAllBooks);
    app.get("/book/:id", check_auth_1.default, bookController.getBook);
    app.post("/book", check_auth_1.default, auth_role_1.default, bookController.addBook);
    app.put("/book/:id", check_auth_1.default, auth_role_1.default, bookController.updateBook);
    app.delete("/book/:id", check_auth_1.default, auth_role_1.default, bookController.deleteBook);
    app.get("/booksByTitle/:title", check_auth_1.default, bookController.getBooksByTitle);
    app.get("/booksByAuthor/:author", check_auth_1.default, bookController.getBooksByAuthor);
    app.get("/authors", check_auth_1.default, auth_role_1.default, authorController.getAllAuthors);
    app.post("/user/signup", userController.createUser);
    app.delete("/user/:id", check_auth_1.default, auth_role_1.default, userController.deleteUser);
    app.post("/user/login", userController.login);
    app.put("/books/book/:id", check_auth_1.default, bookController.bookABook);
    app.put("/books/borrow/:id", check_auth_1.default, auth_role_1.default, bookController.borrow);
}
exports.default = default_1;
