import {Request, Response} from "express";
import AuthorModel from "../models/authorModel";

// get all authors
export let getAllAuthors = async (req: Request, res: Response): Promise<void> => {
    await AuthorModel.find((err, authors) => {
        if (err) {
            res.send(err);
        } else {
            res.send(authors);
        }
    });
}

// get author by id
export let getAuthor = async (req: Request, res: Response): Promise<void> => {
    try {
        let author = await AuthorModel.findById(req.params.id);
        res.send(author);
    } catch {
        console.error("Error!");
    }
}

// delete author by id
export let deleteAuthor = (req: Request, res: Response) => {
    AuthorModel.deleteOne({_id: req.params.id}, (err: any) => {
        if (err) {
            res.send(err);
        } else {
            res.send("Successfully Deleted Author");
        }
    });
};

// update author
export let updateAuthor = (req: Request, res: Response) => {
    AuthorModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        (err: any, author: any) => {
            if (err) {
                res.send(err);
            } else {
                res.send('Updated successfully');
            }
        }
    );
};

// add author
export let addAuthor = (req: Request, res: Response) => {
    let author = new AuthorModel(req.body);

    author.save((err: any) => {
        if (err) {
            res.send(err);
        } else {
            res.send(author);
        }
    });
};

//filter by author name
export let getAuthorByName = async (req: Request, res: Response): Promise<void> => {
    let authors = await AuthorModel.find({name: req.params.name});
    res.send(authors);
}