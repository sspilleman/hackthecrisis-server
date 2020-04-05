import fs from "fs";
import { v5 as uuidv5 } from 'uuid';
import axios, { AxiosResponse, AxiosError } from "axios";

const file = "/Volumes/RED1/Downloads/aircraftDatabase.csv";

const FormData = require('form-data');

const form = new FormData();
form.append('my_field', 'file');
form.append('my_file', fs.createReadStream(file));

console.log("form.getHeaders()", form.getHeaders());

axios.post("http://localhost:2222/api/file", form, {
    maxContentLength: 200000000,
    headers: form.getHeaders()
});

// const formData = {
//     fileName: uuidv5("spilleman.nl", uuidv5.DNS),
//     file: fs.createReadStream(file)
// };

// axios.post("http://localhost:2222/api/file", fs.createReadStream(file), {
//     headers: {
//         'Content-Type': 'multipart/form-data'
//     }
// }).then((response: AxiosResponse) => {
//     console.log(response.statusText);
//     // if (err) { return console.error('upload failed:', err, httpResponse); }
//     // console.log('Upload successful!', body);
// }).catch((reason: AxiosError) => {
//     console.log("failed:", reason.message)
// });

// const axiosheaders_urlencoded = {
//     accept: 'application/json, text/plain, */*',
//     'content-type': 'application/x-www-form-urlencoded',
//     'user-agent': 'axios/0.19.2',
//     'content-length': '751',
//     host: 'localhost:2222',
//     connection: 'close'
// }

// const axiosheaders_formdata = {
//     accept: 'application/json, text/plain, */*',
//     'content-type': 'multipart/form-data',
//     'user-agent': 'axios/0.19.2',
//     'content-length': '751',
//     host: 'localhost:2222',
//     connection: 'close'
// }

// var request = require('request');
// var formData = {
//     my_field: 'file',
//     my_file: fs.createReadStream(file)
// };
// request.post({ url: 'http://localhost:2222/api/file', formData: formData }, function optionalCallback(err: any, httpResponse: any, body: any) {
//     if (err) {
//         return console.error('upload failed:', err);
//     }
//     console.log('Upload successful!  Server responded with:', body);
// });

// const requestheaders = {
//     host: 'localhost:2222',
//     'content-type': 'multipart/form-data; boundary=--------------------------869935754459987196961083',
//     'content-length': '85464225',
//     connection: 'close'
// }
