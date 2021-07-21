import {model, Schema} from "mongoose";

export interface IUser {
    email: string;
    password: string;
}

const UserSchema = new Schema<IUser>({
    email: {type: String, required: true},
    password: {type: String, required: true, unique: true},
});

const UserModel = model<IUser>("User", UserSchema);
export default UserModel;