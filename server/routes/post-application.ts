import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import * as models from "../models";

export async function postApplication(req: Request, res: Response, next: NextFunction) {
    const application = req.body;
    const repo = await getRepository(models.Application);
    const existing = await repo.findOne({ url: application.url });
    if (existing) {
        console.log("app found");
        res.status(409).end();
    } else {
        console.log("app not found");
        await repo.insert(application);
        res.status(200).send(application);
    }
}