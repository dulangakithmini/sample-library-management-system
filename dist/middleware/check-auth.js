"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : {"default": mod};
};
Object.defineProperty(exports, "__esModule", {value: true});
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jsonwebtoken_1.default.verify(token, "secret");
        req.userData = decoded;
        next();
    } catch (error) {
        res.send('Auth failed');
    }
};
exports.default = verifyToken;
