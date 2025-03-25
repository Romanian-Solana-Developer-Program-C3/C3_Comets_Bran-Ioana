import "dotenv/config";

import {
  createSignerFromKeypair,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { clusterApiUrl } from "@solana/web3.js";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";


const kp=getKeypairFromEnvironment("SECRET_KEY");

const umi=createUmi(clusterApiUrl("devnet"));

const keypair=umi.eddsa.createKeypairFromSecretKey(kp.secretKey);
const signer=createSignerFromKeypair(umi,keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

const IMG_URI="https://devnet.irys.xyz/9dYReh7jLiv3JATkfcFBnK1htLr5rNX2UQ3LvvDSC3Xi"
const METADATA_URI="https://devnet.irys.xyz/79ejA7DwRvt8WE8HwxN7HmwVTBa8yeVDzoFfFtaAR2yL";

async function uploadMetadata(){
    try{

        const metadata={
            name:"Carousel",
            symbol:"carousel",
            description:"This is a carousel",
            image: IMG_URI,
            attributes:[
                {trait_type:"Color", value:"multicolor"},
                {trait_type: "Material", value:"metal"},
                {trait_type:"Height",value:"2m"},
            ],
            properties:{
                files:[{type:"image/png", uri:IMG_URI}],
            },
        };

        const metadataUri=await umi.uploader.uploadJson(metadata);
        
        console.log("✅ Done with metadata URI: " , metadataUri);

    }catch(err)
    {
        console.error("[uploadMetadata] Failed with: ", err);
    }
}

uploadMetadata();