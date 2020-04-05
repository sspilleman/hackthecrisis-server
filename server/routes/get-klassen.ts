import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import * as models from "../models";

export async function getKlassen(req: Request, res: Response, next: NextFunction) {
    const klassen = await getRepository(models.Klas).find();
    return res.status(200).send(klassen);
}
