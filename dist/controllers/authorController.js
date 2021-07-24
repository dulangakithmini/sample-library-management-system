"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
            resolve(value);
        });
    }

    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }

        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }

        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }

        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : {"default": mod};
};
Object.defineProperty(exports, "__esModule", {value: true});
exports.getAuthorByName = exports.addAuthor = exports.updateAuthor = exports.deleteAuthor = exports.getAuthor = exports.getAllAuthors = void 0;
const authorModel_1 = __importDefault(require("../models/authorModel"));
// get all authors
let getAllAuthors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield authorModel_1.default.find((err, authors) => {
        if (err) {
            res.send(err);
        } else {
            res.send(authors);
        }
    });
});
exports.getAllAuthors = getAllAuthors;
// get author by id
let getAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let author = yield authorModel_1.default.findById(req.params.id);
        res.send(author);
    } catch (_a) {
        console.error("Error!");
    }
});
exports.getAuthor = getAuthor;
// delete author by id
let deleteAuthor = (req, res) => {
    authorModel_1.default.deleteOne({_id: req.params.id}, (err) => {
        if (err) {
            res.send(err);
        } else {
            res.send("Successfully Deleted Author");
        }
    });
};
exports.deleteAuthor = deleteAuthor;
// update author
let updateAuthor = (req, res) => {
    authorModel_1.default.findByIdAndUpdate(req.params.id, req.body, (err, author) => {
        if (err) {
            res.send(err);
        } else {
            res.send('Updated successfully');
        }
    });
};
exports.updateAuthor = updateAuthor;
// add author
let addAuthor = (req, res) => {
    let author = new authorModel_1.default(req.body);
    author.save((err) => {
        if (err) {
            res.send(err);
        } else {
            res.send(author);
        }
    });
};
exports.addAuthor = addAuthor;
//filter by author name
let getAuthorByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let authors = yield authorModel_1.default.find({name: req.params.name});
    res.send(authors);
});
exports.getAuthorByName = getAuthorByName;
