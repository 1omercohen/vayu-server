import { Request, Response, NextFunction } from "express";
import {
    filterUsers,
    userPage,
    userBulk,
    removeGroupFromUser,
} from "../services/user";
import { Types } from "mongoose";
import {
    IDeleteParams,
    IFilterQuery,
    IPaginationQuery,
    IUpdateBody,
} from "../interfaces";
import { updateGroupStatus } from "../services/group";

export const getUsers = async (
    req: Request<{}, {}, {}, IPaginationQuery>,
    res: Response,
    next: NextFunction
) => {
    try {
        const { limit, page } = req.query;
        const users = await userPage(limit, page);
        return res.status(200).json({ users, page, limit });
    } catch (error) {
        next(Error("somthing made worng"));
    }
};

export const filterUsersByNameOrEmail = async (
    req: Request<{}, {}, {}, IFilterQuery>,
    res: Response,
    next: NextFunction
) => {
    try {
        const { name, email } = req.query;
        let query: { email?: string; name?: string } = {};
        if (email) {
            query.email = email;
        }
        if (name) {
            query.name = name;
        }
        const users = await filterUsers(query);
        return res.status(200).json({ users });
    } catch (error) {
        next(Error("somthing made worng"));
    }
};

export const updateHandler = async (
    req: Request<{}, {}, IUpdateBody>,
    res: Response,
    next: NextFunction
) => {
    try {
        const { users } = req.body;
        const updateQuery = users.map((user: any) => {
            return {
                updateOne: {
                    filter: { _id: new Types.ObjectId(user.id) },
                    update: { $set: { status: user.status } },
                },
            };
        });
        await userBulk(updateQuery);
        return res.status(200).json({ message: "updated users succesfully" });
    } catch (error) {
        next(Error("somthing made worng"));
    }
};

export const deleteGroup = async (
    req: Request<IDeleteParams>,
    res: Response,
    next: NextFunction
) => {
    try {
        const { userId, groupId } = req.params;
        await removeGroupFromUser(userId, groupId);
        await updateGroupStatus(groupId);
        return res
            .status(200)
            .json({ message: "group is not longer connect to user" });
    } catch (error) {
        next(Error("somthing made worng"));
    }
};
