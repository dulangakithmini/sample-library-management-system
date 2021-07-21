import {model, Schema} from "mongoose";

export interface IUser {
    _id: Number;
    email: string;
    password: string;
}

const UserSchema = new Schema<IUser>({
    _id: {type: Schema.Types.ObjectId},
    email: {type: String, required: true},
    password: {type: String, required: true},
});

const UserModel = model<IUser>("Author", UserSchema);
export default UserModel;