import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import * as models from "../models";

export async function postDoelgroep(req: Request, res: Response, next: NextFunction) {
    const doelgroep = req.body;
    const repo = await getRepository(models.Doelgroep);
    const existing = await repo.findOne({ doelgroep: doelgroep.doelgroep });
    if (existing) {
        console.log("doelgroep exist");
        res.status(409).end();
    } else {
        console.log("doelgroep not found");
        await repo.insert(doelgroep);
        res.status(200).send(doelgroep);
    }
}