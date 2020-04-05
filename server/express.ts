import * as path from "path";
import { Express } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import * as routes from "./routes";
import * as middleware from "./middleware";

export function configureExpress(app: Express) {
    app.use(cors());
    app.use(bodyParser.json());
    app.use(cookieParser());
}

export function configureRoutes(app: Express) {

    app.use(middleware.injectLogger);
    app.use(middleware.requestLogger);

    app.get("/api/vakken", routes.getVakken);
    app.post("/api/vakken", routes.postVak); // insert

    app.get("/api/klassen", routes.getKlassen);
    app.post("/api/klassen", routes.postKlas); // insert

    app.get("/api/niveaus", routes.getNiveaus);
    app.post("/api/niveaus", routes.postNiveau); // insert

    app.get("/api/doelgroepen", routes.getDoelgroepen);
    app.post("/api/doelgroepen", routes.postDoelgroep); // insert

    app.post("/api/file", routes.postFile); // insert

    // app.post("/api/login", routes.postLogin);
    // app.post("/api/preauth", routes.postPreauth);
    // app.get("/api/auth", routes.getAuth);
    // app.put("/api/users", routes.putUser); // replace / save
    // app.delete("/api/users", routes.deleteUser); // replace / save
    // app.get("/api/applications", routes.getApplications);
    // app.post("/api/applications", routes.postApplication);
    // app.delete("/api/applications", routes.deleteApplication);
}