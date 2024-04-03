import { Router } from "express";
import { getUsers, updateHandler, deleteGroup } from "../controllers/user";
import { filterUsers } from "../services/user";
import {
    filterQueryValidation,
    updateBodyValidation,
    paginationQueryValidation,
} from "../midddlewares/validation";

const userRoutes = Router();

/*
    BEST PRACTICE:
    every route handle one thing, but real rest tell us 
    this path / of users of get need to bring users with pagination and filtering bt email or namein query params
    but I seperated it like nano service between get users gagination or filtering by properies
*/
userRoutes
    .route("/")
    .get(filterQueryValidation, filterUsers)
    .put(updateBodyValidation, updateHandler);

userRoutes.route("/all").get(paginationQueryValidation, getUsers);

userRoutes.route("/:userId/groups/:groupId").delete(deleteGroup);

export { userRoutes };
