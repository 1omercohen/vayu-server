import mongoose from "mongoose";
import { Status } from "../interfaces";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    status: {
        type: String,
        enum: Status,
        require: true,
        default: Status.PENDING,
    },
    groups: { type: mongoose.Types.ObjectId, ref: "Group" },
});

const User = mongoose.model("User", UserSchema);

export { User };
