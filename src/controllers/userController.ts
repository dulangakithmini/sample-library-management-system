import {Request, Response} from "express";
import UserModel from "../models/userModel";
import * as bcrypt from 'bcrypt';

// add user
export let createUser = (req: Request, res: Response) => {
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        if (err) {
            console.log(err);
        } else {
            let user = new UserModel({
                    email: req.body.email,
                    password: hash,
                }
            );
            user.save().then(result => {
                res.send("User created");
            }).catch(err => {
                console.log(err);
            });
        }
    });
};