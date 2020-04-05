import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import * as models from "../models";

export async function getApplications(req: Request, res: Response, next: NextFunction) {
    console.log("getApplications", req.user);
    const applications = await getRepository(models.Application).find();
    return res.status(200).send(applications);
}
