import { Request, Response, NextFunction } from "express";
import { getRepository, Like } from "typeorm";
import * as models from "../models";

export async function getKlassen(req: Request, res: Response, next: NextFunction) {
    const q = req.query.klas
    if (q && q.length > 0) {
        const klassen = await getRepository(models.Klas).find({ klas: Like(`%${q}%`) });
        return res.status(200).send(klassen);
    }
    const klassen = await getRepository(models.Klas).find();
    return res.status(200).send(klassen);
}
