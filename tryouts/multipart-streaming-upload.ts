import fs from "fs";
// import { createReadStream } from "fs";
import { v5 as uuidv5 } from 'uuid';
import axios, { AxiosResponse, AxiosError } from "axios";

const file = "/Volumes/RED1/Downloads/aircraftDatabase.csv";

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const formData = {
    fileName: uuidv5("spilleman.nl", uuidv5.DNS),
    file: fs.createReadStream(file)
};
axios.post("http://localhost:2000/api/file", formData, {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})
    .then((response: AxiosResponse) => {
        console.log(response.statusText);
        // if (err) { return console.error('upload failed:', err, httpResponse); }
        // console.log('Upload successful!', body);
    })
    .catch((reason: AxiosError) => { console.log(reason.message) });