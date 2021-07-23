"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {type: String, required: true, unique: true},
    role: {
        type: String,
        default: "user",
        enum: ["admin", "user"],
    }
}, {
    timestamps: true,
});
const UserModel = mongoose_1.model("User", UserSchema);
exports.default = UserModel;
