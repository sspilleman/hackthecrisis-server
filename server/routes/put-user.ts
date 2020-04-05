import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import * as models from "../models";

export async function putUser(req: Request, res: Response, next: NextFunction) {
    const user = req.body;
    const repo = await getRepository(models.User);
    const existing = await repo.findOne({ email: user.email });
    if (existing) {
        console.log("user found");
        await repo.save(user);
        res.status(200).send(user);
    } else {
        console.log("user not found");
        res.status(409).end();
    }
}