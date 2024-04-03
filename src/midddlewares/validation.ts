import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import {
    IFilterQuery,
    IPaginationQuery,
    IUpdateBody,
    Status,
} from "../interfaces";

export const paginationQueryValidation = async (
    req: Request<{}, {}, {}, IPaginationQuery>,
    res: Response,
    next: NextFunction
) => {
    const querySchema = z.object({
        query: z.object({
            limit: z.number().positive(),
            page: z.number().positive(),
        }),
    });
    try {
        await querySchema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        return next();
    } catch (error) {
        next(error);
    }
};

export const filterQueryValidation = async (
    req: Request<{}, {}, {}, IFilterQuery>,
    res: Response,
    next: NextFunction
) => {
    const querySchema = z.object({
        query: z
            .object({
                name: z.string().min(2),
            })
            .or(
                z.object({
                    email: z.string().email(),
                })
            ),
    });
    try {
        await querySchema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        return next();
    } catch (error) {
        next(error);
    }
};

export const updateBodyValidation = async (
    req: Request<{}, {}, IUpdateBody>,
    res: Response,
    next: NextFunction
) => {
    const StatusEnum = z.nativeEnum(Status);
    type StatusEnum = z.infer<typeof StatusEnum>;
    const querySchema = z.object({
        body: z.object({
            users: z
                .object({
                    id: z.string().min(7),
                    status: StatusEnum,
                })
                .array()
                .nonempty(),
        }),
    });
    try {
        await querySchema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        return next();
    } catch (error) {
        next(error);
    }
};
