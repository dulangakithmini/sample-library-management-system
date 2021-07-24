import {model, Schema} from "mongoose";

export interface IUser {
    email: string;
    password: string;
    role: string;
    requests: [Date];
}

const UserSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {type: String, required: true, unique: true},
    role: {
        type: String,
        default: "user",
        enum: ["admin", "user"],
    },
    requests: [Date],
}, {
    timestamps: true,
});

const UserModel = model<IUser>("User", UserSchema);
export default UserModel;