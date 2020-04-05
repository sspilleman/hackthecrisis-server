import "reflect-metadata";
import { createConnection } from "typeorm";

export async function configureTypeorm() {
    const connection = await createConnection();
    await connection.synchronize(false);
}
