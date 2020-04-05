const sqlite = {
    type: "sqlite",
    database: "/db/hackthecrisis.sqlite",
    entities: [__dirname + "/server/models/*.ts"],
    synchronize: true,
    logging: false
}

module.exports = sqlite;