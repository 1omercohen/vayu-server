import { Document, ObjectId } from "mongoose";

export interface IGroup extends Document {
    isEmpty: boolean;
    count: number;
}

export enum Status {
    ACTIVE = "active",
    PENDING = "pending",
    BLOCKED = "blocked",
}

export interface IUser extends Document {
    name: string;
    email: string;
    status: Status;
    groups: ObjectId[];
}

export interface IPaginationQuery {
    page: number;
    limit: number;
}

export interface IFilterQuery {
    email: string;
    name: string;
}

export interface IUpdateBody {
    users: { id: string; status: Status }[];
}

export interface IDeleteParams {
    userId: string;
    groupId: string;
}
