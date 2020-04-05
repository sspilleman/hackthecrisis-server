import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import * as models from "../models";

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
    const user = req.body;
    if (user.email === "sander@spilleman.nl") {
        return res.status(405).end();
    }
    const repo = await getRepository(models.User);
    const existing = await repo.findOne({ email: user.email });
    if (existing) {
        console.log("user found");
        const result = await repo.delete({id: user.id})
        res.status(200).send(result);
    } else {
        console.log("user not found");
        res.status(404).end();
    }
}