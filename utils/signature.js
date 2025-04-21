import { ethers } from "ethers";
// import { create } from "ipfs";
// import { readFile } from "fs";

export function GetSignature(sk, message) {
  const wallet = new ethers.Wallet(sk);
  if (message === undefined) {
    throw new Error("message is undefined");
  }

  const signature = wallet.signMessage(message);

  console.log("Signature:", signature);
  return signature;
}

// export async function CalculateMid(path) {
//   const data = await read(path);
//   const ipfs = await create();
//   try {
//     const { cid } = await ipfs.add(data);
//     return cid.toString();
//   } finally {
//     await ipfs.stop();
//   }
// }

// function read(path) {
//   return new Promise((resolve, reject) => {
//     readFile(path, (err, data) => {
//       if (err) {
//         reject(err);
//         return;
//       } else {
//         resolve(data);
//       }
//     });
//   });
// }
