import { Request, Response, NextFunction } from "express";
import { getRepository, Like } from "typeorm";
import * as models from "../models";

export async function getNiveaus(req: Request, res: Response, next: NextFunction) {
    const q = req.query.niveau
    if (q && q.length > 0) {
        const niveaus = await getRepository(models.Niveau).find({ niveau: Like(`%${q}%`) });
        return res.status(200).send(niveaus);
    }
    const niveaus = await getRepository(models.Niveau).find();
    return res.status(200).send(niveaus);
}
