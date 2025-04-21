/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import { BackendSDk } from "./server.js";
import { GetSignature } from "../utils/signature.js";

const uri = "http://localhost:8081";
const address = "0xE351132cbAAad4F94FDB59147f7d3Cb47E2e9E24";
const chainID = "985";
const sk = "xxx";
const filesize = 1024 * 1024;

const client = new BackendSDk(uri, address, chainID, "mefs");

try {
  const message = await client.Challenge("https://memo.io");
  const signature = await GetSignature(sk, message);

  await client
    .Login(signature)
    .then((text) => {
      console.log(text);
    })
    .catch((error) => {
      console.error("Request failed:", error);
    });
} catch (error) {
  console.error("Request failed:", error);
}

await client
  .PutObject("/home/steven/api-sdk-js/random_files/123333.txt")
  .then((text) => {
    console.log(text);
  })
  .catch((error) => {
    console.error("Request failed:", error);
  });
