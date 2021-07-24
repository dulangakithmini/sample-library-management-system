"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
const decode_token_1 = require("../utils/decode-token");
let verifyRole = (req, res, next) => {
    let userData = decode_token_1.decodeToken(req);
    if (userData.role !== "admin") {
        return res.send('Not allowed');
    }
    next();
};
exports.default = verifyRole;
