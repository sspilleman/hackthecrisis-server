import { Request, Response, NextFunction } from "express";
import bunyan from "bunyan";
import { v5 as uuidv5 } from 'uuid'; 

export const logger = bunyan.createLogger({ name: 'hackthecrisis-server' });

export function injectLogger(req: Request, res: Response, next: NextFunction) {
    req.logger = logger.child({ uuid: uuidv5("spilleman.nl", uuidv5.DNS) });
    next();
};
