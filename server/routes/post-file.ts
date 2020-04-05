import * as path from "path";
import * as minio from "minio";
import Busboy from "busboy";
import { Request, Response, NextFunction } from "express";
import { config } from "../../config";

const minioClient = new minio.Client(config.s3);

export async function postFile(req: Request, res: Response, next: NextFunction) {
    console.log("headers", req.headers);
    const busboy = new Busboy({ headers: req.headers });
    busboy.on('file', (fieldname, stream, filename, encoding, mimetype) => {
        req.logger.info({ fieldname, filename, encoding, mimetype }, "receiving");
        minioClient.putObject(config.bucket, path.basename(filename), stream, (err, etag) => {
            if (err) {
                req.logger.error(err, `${filename} failed`);
                return res.status(500).send(err);
            }
            req.logger.info({ filename }, "done");
            res.writeHead(200, { 'Connection': 'close' });
            return res.end("That's all folks!");
        })
    });
    return req.pipe(busboy);
}
