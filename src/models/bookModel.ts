import * as mongoose from "mongoose";

export interface IBook extends mongoose.Document {
    title: string;
    author: string;
    category: string;
    summary: string;
    url: string;
}

export const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
});

const Book = mongoose.model<IBook>("Book", BookSchema);
export default Book;