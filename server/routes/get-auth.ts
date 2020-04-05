import { Request, Response, NextFunction } from "express";
import * as duo from "../duo";

const pushinfo = {
    from: "my docker server",
    site: ""
};

export async function getAuth(req: Request, res: Response, next: NextFunction) {
    const params = req.query;
    console.log("getAuth", params);
    pushinfo.site = params.website;
    const authresult = await duo.auth(params.email, params.device, pushinfo);
    console.log("authresult", authresult);
    res.redirect("https://blog.spilleman.nl");
    // res.redirect(params.website);
}