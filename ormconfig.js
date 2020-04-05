const config = require("./config");
// console.log(config.config.database);

const sqlite = {
    type: "sqlite",
    database: config.config.database,
    entities: [__dirname + "/server/models/*.ts"],
    synchronize: true,
    logging: false
}

module.exports = sqlite;