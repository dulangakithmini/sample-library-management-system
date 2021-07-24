"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : {"default": mod};
};
Object.defineProperty(exports, "__esModule", {value: true});
exports.decodeToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let decodeToken = (request) => {
    const token = request.headers.authorization.split(" ")[1];
    const decoded = jsonwebtoken_1.default.verify(token, "secret");
    request.userData = decoded;
    return request.userData;
};
exports.decodeToken = decodeToken;
