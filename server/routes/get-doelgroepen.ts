import { Request, Response, NextFunction } from "express";
import { getRepository, Like } from "typeorm";
import * as models from "../models";

export async function getDoelgroepen(req: Request, res: Response, next: NextFunction) {
    const q = req.query.doelgroep
    if (q && q.length > 0) {
        const doelgroepen = await getRepository(models.Doelgroep).find({ doelgroep: Like(`%${q}%`) });
        return res.status(200).send(doelgroepen);
    }
    const doelgroepen = await getRepository(models.Doelgroep).find();
    return res.status(200).send(doelgroepen);
}
