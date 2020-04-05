import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import * as models from "../models";

export async function getDoelgroepen(req: Request, res: Response, next: NextFunction) {
    const doelgroepen = await getRepository(models.Doelgroep).find();
    return res.status(200).send(doelgroepen);
}
