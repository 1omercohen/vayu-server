import { Types } from "mongoose";
import { User } from "../models/user";

export const userPage = (limit: number, page: number) => {
    return User.find({}, {}, { skip: limit * page, limit });
};

export const filterUsers = (query: { email?: string; name?: string }) => {
    return User.find(query);
};

/*
    FOR SCALE: bulk is half solution because if we work directly to DB we sould more replicates of mongodb
*/
export const userBulk = (updateQuery: any[]) => {
    return User.bulkWrite(updateQuery);
};

export const removeGroupFromUser = (userId: string, groupId: string) => {
    return User.updateOne(
        { _id: new Types.ObjectId(userId) },
        { $pull: { groups: new Types.ObjectId(groupId) } }
    );
};
