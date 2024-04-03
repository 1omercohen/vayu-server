import { Document } from "mongoose";
import { Group } from "../models/group";
import { IGroup } from "../interfaces";

export const updateGroupStatus = async (id: string) => {
    const group: IGroup | null = await Group.findById(id);
    if (group) {
        group.count = group.count - 1;
        if (group.count === 0) {
            group.isEmpty = true;
        }
        await group.save();
    }
};
