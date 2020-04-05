import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import * as models from "../models";

// export async function deleteApplication(req: Request, res: Response, next: NextFunction) {
//     const application = req.body;
//     if (application.user === "admin") {
//         return res.status(405).end();
//     }
//     const repo = await getRepository(models.Application);
//     const existing = await repo.findOne({ url: application.url });
//     if (existing) {
//         console.log("application found");
//         const result = await repo.delete({id: application.id})
//         res.status(200).send(result);
//     } else {
//         console.log("application not found");
//         res.status(404).end();
//     }
// }