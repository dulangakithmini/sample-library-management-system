import UserModel from "../models/userModel";
import {NextFunction, Response} from "express";
import {decodeToken} from "../utils/decode-token";

let limitRequests = async (req: any, res: Response, next: NextFunction) => {
    try {
        let userData = decodeToken(req);

        let user = await UserModel.findById(userData.userId);
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

                await UserModel.findByIdAndUpdate(userData.userId, {requests: requestTimes});

                next();
            } else {
                return res.send('Too many requests! Try again later.');
            }
        } else {
            requestTimes.push(currentTime);

            await UserModel.findByIdAndUpdate(userData.userId, {requests: requestTimes});

            next();
        }
    } catch (error) {
        console.error(error);
    }
}

export default limitRequests;