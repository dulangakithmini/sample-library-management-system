import {model, Schema} from "mongoose";

export interface IAuthor {
    _id: Number,
    name: string;
}

export const AuthorSchema = new Schema<IAuthor>({
    _id: {type: Schema.Types.ObjectId},
    name: {type: String, required: true},
});

const AuthorModel = model<IAuthor>("Author", AuthorSchema);
export default AuthorModel;