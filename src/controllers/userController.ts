import {Request, Response} from "express";
import UserModel from "../models/userModel";
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
                            role: req.body.role,
                            books: req.body.books
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

// login
export let login = (req: Request, res: Response) => {
    UserModel.find({email: req.body.email}).then(user => {
        if (user.length < 1) {
            res.send('Authorization failed!');
        } else {
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.send('Authorization failed!');
                }
                if (result) {
                    const token = jwt.sign({
                            email: user[0].email,
                            userId: user[0]._id,
                            role: user[0].role
                        }, "secret",
                        {
                            expiresIn: "1h"
                        }
                    );
                    return res.send(`Auth success! token: ${token}`);
                }
                return res.send('Authorization failed!');
            });
        }
    })
}

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

// activate user
export let activateUser = async (req: Request, res: Response) => {
    await UserModel.findByIdAndUpdate(req.body.id, {isActive: true});
    res.send('User is activated!');
};