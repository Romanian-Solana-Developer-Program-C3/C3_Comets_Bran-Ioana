import "dotenv/config";

import {
  createGenericFile,
  createSignerFromKeypair,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { clusterApiUrl } from "@solana/web3.js";
import { readFile } from "fs/promises";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";

const kp=getKeypairFromEnvironment("SECRET_KEY");

const umi=createUmi(clusterApiUrl("devnet"));

const keypair=umi.eddsa.createKeypairFromSecretKey(kp.secretKey);
const signer=createSignerFromKeypair(umi,keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

const IMG_URI="https://devnet.irys.xyz/9dYReh7jLiv3JATkfcFBnK1htLr5rNX2UQ3LvvDSC3Xi"
const IMAGE_FILE="./carousel.png";

export async function uploadImage(){

    try{

        console.log("⌛Uploading image ...");

        const img=await readFile(IMAGE_FILE);
        const imgConverted=createGenericFile(new Uint8Array(img),"image/png");

        const [myUri]=await umi.uploader.upload([imgConverted]);

        console.log("✅ Done with URI: ", myUri);

    }catch(err){

        console.error("[uploadImage] Failed with error: ", err);
    }
}

uploadImage();