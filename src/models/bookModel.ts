import {model, Schema} from "mongoose";

export interface IBook {
    title: string;
    author: string;
    category: string;
    summary: string;
    isBooked: boolean;
    isBorrowed: boolean;
}

const BookSchema = new Schema<IBook>({
    title: {type: String, required: true},
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Author',
        required: true,
    },
    category: {type: String, required: true},
    summary: {type: String, required: true},
    isBooked: {type: Boolean, default: false},
    isBorrowed: {type: Boolean, default: false},
    bookedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
}, {
    timestamps: true,
});

const BookModel = model<IBook>("Book", BookSchema);
export default BookModel;