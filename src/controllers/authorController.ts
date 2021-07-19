import {Request, Response} from "express";
import AuthorModel from "../models/authorModel";

// get all books
export let getAllAuthors = async (req: Request, res: Response): Promise<void> => {
    let authors = await AuthorModel.find((err, authors) => {
        if (err) {
            res.send(err);
        } else {
            res.send(authors);
        }
    });
}