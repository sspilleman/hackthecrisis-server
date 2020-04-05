import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import * as models from "../models";

export async function getNiveaus(req: Request, res: Response, next: NextFunction) {
    const niveaus = await getRepository(models.Niveau).find();
    return res.status(200).send(niveaus);
}
