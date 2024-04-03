import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema({
    name: { type: String, require: true },
    isEmpty: { type: Boolean, default: true },
    count: { type: Number, default: 0 },
});

const Group = mongoose.model("Group", GroupSchema);

export { Group };
