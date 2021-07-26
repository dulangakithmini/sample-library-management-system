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
exports.activateUser = exports.deleteUser = exports.login = exports.createUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt = __importStar(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// add user
let createUser = (req, res) => {
    userModel_1.default.find({email: req.body.email}).then(user => {
        // to verify that the user is not an empty array
        if (user.length >= 1) {
            res.send("User already exists!");
        } else {
            bcrypt.hash(req.body.password, 10, function (err, hash) {
                if (err) {
                    console.log(err);
                } else {
                    let user = new userModel_1.default({
                        email: req.body.email,
                        password: hash,
                        role: req.body.role,
                        books: req.body.books
                    });
                    user.save().then(result => {
                        res.send("User created");
                    }).catch(err => {
                        res.send(err);
                    });
                }
            });
        }
    });
};
exports.createUser = createUser;
// login
let login = (req, res) => {
    userModel_1.default.find({email: req.body.email}).then(user => {
        if (user.length < 1) {
            res.send('Authorization failed!');
        } else {
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.send('Authorization failed!');
                }
                if (result) {
                    const token = jsonwebtoken_1.default.sign({
                        email: user[0].email,
                        userId: user[0]._id,
                        role: user[0].role
                    }, "secret", {
                        expiresIn: "1h"
                    });
                    return res.send(`Auth success! token: ${token}`);
                }
                return res.send('Authorization failed!');
            });
        }
    });
};
exports.login = login;
// delete user
let deleteUser = (req, res) => {
    let user = userModel_1.default.deleteOne({_id: req.params.id}, (err) => {
        console.log(req.params.id);
        if (err) {
            res.send(err);
        } else {
            res.send("Successfully deleted the user");
        }
    });
};
exports.deleteUser = deleteUser;
// activate user
let activateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield userModel_1.default.findByIdAndUpdate(req.body.id, {isActive: true});
    res.send('User is activated!');
});
exports.activateUser = activateUser;
