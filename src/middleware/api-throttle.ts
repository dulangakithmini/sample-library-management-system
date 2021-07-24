import jwt from "jsonwebtoken";
import UserModel from "../models/userModel";
import {NextFunction, Response} from "express";

let limitRequests = async (req: any, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, "secret");
        req.userData = decoded;

        let user = await UserModel.findById(req.userData.userId);
        if (!user) {
            res.send("Error!");
            return;
        }

        let requestTimes = user.requests;
        let currentTime = new Date();

        if (requestTimes.length ! < 10) {
            let start_time = requestTimes[0];

            if (currentTime.getTime() - start_time.getTime() > 60000) {
                requestTimes.shift();
                requestTimes.push(currentTime);

                await UserModel.findByIdAndUpdate(req.userData.userId, {requests: requestTimes});

                next();
            } else {
                return res.send('Too many requests! Try again later.');
            }
        } else {
            requestTimes.push(currentTime);

            await UserModel.findByIdAndUpdate(req.userData.userId, {requests: requestTimes});

            next();
        }
    } catch (error) {
        console.error(error);
    }
}

export default limitRequests;