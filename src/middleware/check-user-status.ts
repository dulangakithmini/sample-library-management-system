import UserModel from "../models/userModel";
import {NextFunction, Response} from "express";
import {decodeToken} from "../utils/decode-token";

let checkStatus = async (req: any, res: Response, next: NextFunction) => {
    try {
        let userData = decodeToken(req);

        let user = await UserModel.findById(userData.userId);
        if (!user) {
            res.send("Error!");
            return;
        }

        if (user.isActive) {
            next();
        } else {
            return res.send('User is suspended!')
        }
    } catch (error) {
        console.error(error);
    }
}

export default checkStatus;