import {model, Schema} from "mongoose";

export interface IBook {
    title: string;
    author: string;
    category: string;
    summary: string;
    url: string;
}

export const BookSchema = new Schema<IBook>({
    title: {type: String, required: true},
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Author',
        required: true,

    },
    category: {type: String, required: true},
    summary: {type: String, required: true},
    url: {type: String, required: true},
}, {
    timestamps: true,
});

const BookModel = model<IBook>("Book", BookSchema);
export default BookModel;