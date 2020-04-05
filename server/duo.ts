import * as qs from "querystring";
import * as duo_api from "@duosecurity/duo_api";
// const execSync = require('child_process').execSync;

const ikey = "DIWIPUZXD323MX0LMVGS";
const skey = "pNhZbNU89DlaW3DeBDDJZJVtQPV1TYv9LfDBKbA4";
const host = "api-d36d0026.duosecurity.com";
const client = new duo_api.Client(ikey, skey, host);

interface Idevice {
    capabilities: string[];
    device: string;
    display_name: string;
    name: string;
    number: string;
    type: string;
}

interface Ipreauthresponse {
    devices: Idevice[];
    result: string;
    status_msg: string;
    enroll_portal_url: string;
}

interface Ipreauth {
    stat: string;
    response: Ipreauthresponse;
}

interface Iauthresponse {
    result: string;
    status: string;
    status_msg: string;
}

interface Iauth {
    code: number;
    message: string;
    message_detail: string;
    stat: string;
    response: Iauthresponse;
}

export function enroll(username: string): Promise<Ipreauthresponse> {
    return new Promise((resolve) => {
        client.jsonApiCall('POST', '/auth/v2/enroll', { username: username }, (r: Ipreauth) => {
            console.log("enroll", username, r);
            if (r.stat === "OK") {
                return resolve(r.response);
            } else {
                return resolve(undefined);
            }
        });
    });
}

export function preauth(username: string): Promise<Ipreauthresponse> {
    return new Promise((resolve) => {
        client.jsonApiCall('POST', '/auth/v2/preauth', { username: username }, (r: Ipreauth) => {
            // console.log("preauth", r);
            if (r.stat === "OK") {
                return resolve(r.response);
            } else {
                return resolve(undefined);
            }
        });
    });
}

export function auth(username: string, device: string, pushinfo: any): Promise<Iauthresponse> {
    return new Promise((resolve) => {
        client.jsonApiCall('POST', '/auth/v2/auth', {
            username: username,
            type: "Login",
            factor: "push",
            pushinfo: qs.stringify(pushinfo),
            device: device,
            async: "0"
        }, (r: Iauth) => {
            // console.log("auth", r);
            if (r.stat === "OK") {
                return resolve(r.response);
            } else {
                console.log("error", r);
                return resolve(undefined);
            }
        });
    });
}

// async function run(username: string, site: string) {
    // const preauthresponse = await preauth(username);
    // switch (preauthresponse.result) {
    //     case "auth":
    //         const authresponse = await auth(username, preauthresponse.devices[0], pushinfo);
    //         switch (authresponse.result) {
    //             case "allow":
    //                 console.log("yoooohooooo!", authresponse.status_msg);
    //                 break;
    //             case "deny":
    //                 console.log("bummerrrrr!", authresponse.status_msg);
    //                 break;
    //             default:
    //                 console.log("unknown", authresponse);
    //                 break;
    //         }
    //         break;
    //     case "enroll":
    //         console.log(`not implemented, should open: ${preauthresponse.enroll_portal_url}`);
    //         break;
    //     case "deny":
    //         console.log(`denied: ${preauthresponse.status_msg}`);
    //         break;
    //     default:
    //         console.log("unknown", preauthresponse);
    //         break;
    // }
// }

// run("sander@spilleman.nl", "blog.spilleman.nl").catch(console.log);
