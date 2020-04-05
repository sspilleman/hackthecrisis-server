import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import * as models from "../models";

export async function postVak(req: Request, res: Response, next: NextFunction) {
    const vak = req.body;
    const repo = await getRepository(models.Vak);
    const existing = await repo.findOne({ vak: vak.vak });
    if (existing) {
        console.log("vak exist");
        res.status(409).end();
    } else {
        console.log("vak not found");
        await repo.insert(vak);
        res.status(200).send(vak);
    }
}