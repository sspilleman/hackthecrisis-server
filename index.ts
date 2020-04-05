import express from "express";
import chalk from "chalk";
import { configureExpress, configureRoutes } from "./server/express";
import { configureTypeorm } from "./server/lib/typeorm"
import {config} from "./config";

// console.log(process.env);

async function main() {
    // ---------------------------------------------------------------------------------------
    // configure express
    // ---------------------------------------------------------------------------------------
    const app = express();
    configureExpress(app);
    // ---------------------------------------------------------------------------------------
    // configure connections
    // ---------------------------------------------------------------------------------------
    await configureTypeorm();
    // ---------------------------------------------------------------------------------------
    // configure routes
    // ---------------------------------------------------------------------------------------
    configureRoutes(app);
    // ---------------------------------------------------------------------------------------
    // START LISTENING
    // ---------------------------------------------------------------------------------------
    app.listen(config.port, () => { console.log(chalk.whiteBright(`🚀 Server listening on port ${config.port}`)); });
}

main()
    .catch(e => { console.error("error in main", e); })
    .finally();
