import {Request, Response} from "express";
import UserModel from "../models/userModel";
import * as bcrypt from 'bcrypt';

// add user
export let createUser = (req: Request, res: Response) => {
    UserModel.find({email: req.body.email}).then(user => {
        // to verify that the user is not an empty array
        if (user.length >= 1) {
            res.send("User already exists!");
        } else {
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
                        res.send(err);
                    });
                }
            });
        }
    })
};

// delete user
export let deleteUser = (req: Request, res: Response) => {
    let user = UserModel.deleteOne({_id: req.params.id}, (err: any) => {
        console.log(req.params.id);
        if (err) {
            res.send(err);
        } else {
            res.send("Successfully deleted the user");
        }
    });
};