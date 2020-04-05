import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import * as models from "../models";

export async function postKlas(req: Request, res: Response, next: NextFunction) {
    const klas = req.body;
    const repo = await getRepository(models.Klas);
    const existing = await repo.findOne({ klas: klas.klas });
    if (existing) {
        console.log("klas exist");
        res.status(409).end();
    } else {
        console.log("klas not found");
        await repo.insert(klas);
        res.status(200).send(klas);
    }
}