import multer from 'multer';
import {Request} from "express";

const storage = multer.diskStorage({
    destination: function (req: Request, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, 'books.json');
    }
});

export const upload = multer({storage: storage});