import {model, Schema} from "mongoose";

export interface IBook {
    title: string;
    author: string;
    category: string;
    summary: string;
    isBooked: boolean;
    isBorrowed: boolean;
    bookedBy: string;
    borrowedBy: string;
    borrowedTime: Date;
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
    isBooked: {type: Boolean, default: false},
    isBorrowed: {type: Boolean, default: false},
    bookedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    borrowedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    borrowedTime: Date,
}, {
    timestamps: true,
});

const BookModel = model<IBook>("Book", BookSchema);
export default BookModel;