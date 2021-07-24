"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
const decode_token_1 = require("../utils/decode-token");
let verifyToken = (req, res, next) => {
    try {
        decode_token_1.decodeToken(req);
        next();
    } catch (error) {
        res.send('Auth failed');
    }
};
exports.default = verifyToken;
