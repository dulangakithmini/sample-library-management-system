import {Request, Response} from "express";
import UserModel from "../models/userModel";

// add user
export let createUser = (req: Request, res: Response) => {
    let user = new UserModel();

    user.save((err: any) => {
        if (err) {
            res.send(err);
        } else {
            res.send(user);
        }
    });
};