import { Request, Response, NextFunction } from "express";
import { getRepository, Like } from "typeorm";
import * as models from "../models";

export async function getVakken(req: Request, res: Response, next: NextFunction) {
    const q = req.query.vak
    if (q && q.length > 0) {
        const vakken = await getRepository(models.Vak).find({ vak: Like(`%${q}%`) });
        return res.status(200).send(vakken);
    }
    const vakken = await getRepository(models.Vak).find();
    return res.status(200).send(vakken);
}
