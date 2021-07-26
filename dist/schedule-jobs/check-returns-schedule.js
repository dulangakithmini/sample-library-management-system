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
const node_schedule_1 = __importDefault(require("node-schedule"));
const bookModel_1 = __importDefault(require("../models/bookModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
exports.default = node_schedule_1.default.scheduleJob('*/2 * * * * *', () => __awaiter(void 0, void 0, void 0, function* () {
    // 0 8/12 */1 * *
    try {
        const books = yield bookModel_1.default.find({isBorrowed: true, overDue: false});
        if (books.length > 0) {
            console.log(books);
            books.map((book) => __awaiter(void 0, void 0, void 0, function* () {
                if (new Date().getTime() - book.borrowedTime.getTime() > 60000) {
                    console.log(`User ${book.borrowedBy} has been suspended!`);
                    yield book.updateOne({overDue: true});
                    yield userModel_1.default.findByIdAndUpdate(book.borrowedBy, {isActive: false});
                }
            }));
        }
    } catch (error) {
        console.log(error);
    }
}));
