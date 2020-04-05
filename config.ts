export const config = {
    database: "/db/hackthecrisis.sqlite",
    // database: "hackthecrisis.sqlite",
    port: 2222,
    bucket: "schooling",
    s3: {
        endPoint: 's3.spilleman.nl',
        port: 443,
        useSSL: true,
        accessKey: process.env['MINIO_ACCESS_KEY'],
        secretKey: process.env['MINIO_SECRET_KEY'],
    }
}