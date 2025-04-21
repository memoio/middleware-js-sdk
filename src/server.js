/* eslint-disable no-unused-vars */

import fetch from "node-fetch";
import { ethers } from "ethers";
import { writeFileSync, readFile } from "fs";
import { randomBytes } from "crypto";
import { FormData } from "node-fetch";
import { Blob } from "node-fetch";

export class BackendSDk {
  constructor(uri, address, chainID, storage) {
    this.uri = uri;
    this.address = address;
    this.chainID = chainID;
    this.storage = storage;
  }

  async Challenge(domain) {
    const url = `${this.uri}/challenge?address=${this.address}&chainid=${this.chainID}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "text/plain",
        Origin: domain,
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.text();
      this.message = data;
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async Login(signature) {
    const url = `${this.uri}/login`;
    const data = { message: this.message, signature: signature };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    console.log(data);

    // eslint-disable-next-line no-useless-catch
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      this.access = data.accessToken;
      this.refresh = data.refreshToken;
      return data;
    } catch (error) {
      throw error;
    }
  }

  async GetSignature(sk) {
    const wallet = new ethers.Wallet(sk);
    if (this.message === undefined) {
      throw new Error("message is undefined");
    }

    const signature = await wallet.signMessage(this.message);

    console.log("Signature:", signature);
    this.signature = signature;
  }

  async PutObject(path, filename) {
    const url = `${this.uri}/${this.storage}/`;

    const fileContent = await readFileContent(path);
    if (filename === undefined) {
      throw new Error("filename is undefined");
    }
    const formData = new FormData();
    formData.append("file", fileContent, filename);
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.access}`,
      },
      body: formData,
    };

    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  }

  async GetObject() {}
}

function readFileContent(filePath) {
  return new Promise((resolve, reject) => {
    readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
        return;
      } else {
        const blob = new Blob([data]);
        resolve(blob);
      }
    });
  });
}

export function GenerateRandomFile(sizeInBytes, directory) {
  const randomString = randomBytes(4).toString("hex");
  const timestamp = Date.now();
  const fileName = `${randomString}_${timestamp}.txt`;
  const filePath = `${directory}/${fileName}`;

  const buffer = randomBytes(sizeInBytes);

  writeFileSync(filePath, buffer);

  console.log(`Random file "${filePath}" generated with ${sizeInBytes} bytes.`);
}
