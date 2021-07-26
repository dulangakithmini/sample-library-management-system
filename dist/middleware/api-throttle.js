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
const userModel_1 = __importDefault(require("../models/userModel"));
const decode_token_1 = require("../utils/decode-token");
let limitRequests = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userData = decode_token_1.decodeToken(req);
        let user = yield userModel_1.default.findById(userData.userId);
        if (!user) {
            res.send("Error!");
            return;
        }
        let requestTimes = user.requests;
        let currentTime = new Date();
        if (requestTimes.length > 9) {
            let start_time = requestTimes[0];
            if (currentTime.getTime() - start_time.getTime() > 60000) {
                requestTimes.shift();
                requestTimes.push(currentTime);
                yield userModel_1.default.findByIdAndUpdate(userData.userId, {requests: requestTimes});
                next();
            } else {
                return res.send('Too many requests! Try again later.');
            }
        } else {
            requestTimes.push(currentTime);
            yield userModel_1.default.findByIdAndUpdate(userData.userId, {requests: requestTimes});
            next();
        }
    } catch (error) {
        console.error(error);
    }
});
exports.default = limitRequests;
