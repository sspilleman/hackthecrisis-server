import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import * as models from "../models";

export async function postNiveau(req: Request, res: Response, next: NextFunction) {
    const niveau = req.body;
    const repo = await getRepository(models.Niveau);
    const existing = await repo.findOne({ niveau: niveau.niveau });
    if (existing) {
        console.log("niveau exist");
        res.status(409).end();
    } else {
        console.log("niveau not found");
        await repo.insert(niveau);
        res.status(200).send(niveau);
    }
}