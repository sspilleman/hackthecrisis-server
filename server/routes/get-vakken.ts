import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import * as models from "../models";

export async function getVakken(req: Request, res: Response, next: NextFunction) {
    const vakken = await getRepository(models.Vak).find();
    return res.status(200).send(vakken);
}
