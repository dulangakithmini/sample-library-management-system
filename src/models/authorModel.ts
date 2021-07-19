import {model, Schema} from "mongoose";

export interface IAuthor {
    name: string;
}

const AuthorSchema = new Schema<IAuthor>({
    name: {type: String, required: true},
});

const AuthorModel = model<IAuthor>("Author", AuthorSchema);
export default AuthorModel;