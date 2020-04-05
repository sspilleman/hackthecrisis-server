import * as minio from "minio";
import { config } from "../config";

const minioClient = new minio.Client(config.s3);

async function createBucketIfNeeded(bucket: string) {
    if ((await minioClient.bucketExists(bucket)) === false) {
        console.log(`creating bucket: ${bucket}`);
        await minioClient.makeBucket(bucket, "");
        return true;
    }
    return false;
}

async function uploadFile(bucket: string, filename: string, file: string) {
    const metaData = {
        'Content-Type': 'application/octet-stream',
        'X-Amz-Meta-Testing': 1234,
        'example': 5678
    }
    const etag = await minioClient.fPutObject(bucket, filename, file, metaData).catch((reason) => {
        return console.log(reason);
    });
    console.log('File uploaded successfully.', etag);
}


async function run() {
    await createBucketIfNeeded(config.bucket);
    const buckets = await minioClient.listBuckets();
    console.log(buckets);
    // await uploadFile("schooling", "private-thumbs.jpg", file2);
    // var size = 0
    // minioClient.getObject('schooling', 'filename', (err, dataStream) => {
    //     if (err) {
    //         return console.log(err)
    //     }
    //     dataStream.on('data', function (chunk) {
    //         size += chunk.length
    //     })
    //     dataStream.on('end', function () {
    //         console.log('End. Total size = ' + size)
    //     })
    //     dataStream.on('error', function (err) {
    //         console.log(err)
    //     })
    // })
}

run()
    .catch(e => { console.error("error in main", e); })
    .finally();

