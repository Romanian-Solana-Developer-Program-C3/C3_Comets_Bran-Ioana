import "dotenv/config";

import {
  createSignerFromKeypair,
  generateSigner,
  percentAmount,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { clusterApiUrl } from "@solana/web3.js";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";
import {
  createNft,
  mplTokenMetadata,
} from "@metaplex-foundation/mpl-token-metadata";
import { base58 } from "@metaplex-foundation/umi/serializers";
import { create } from "domain";



const kp=getKeypairFromEnvironment("SECRET_KEY");

const umi=createUmi(clusterApiUrl("devnet"));

const keypair=umi.eddsa.createKeypairFromSecretKey(kp.secretKey);
const signer=createSignerFromKeypair(umi,keypair);

umi.use(mplTokenMetadata());
umi.use(signerIdentity(signer));

const IMG_URI="https://devnet.irys.xyz/9dYReh7jLiv3JATkfcFBnK1htLr5rNX2UQ3LvvDSC3Xi"
const METADATA_URI="https://devnet.irys.xyz/79ejA7DwRvt8WE8HwxN7HmwVTBa8yeVDzoFfFtaAR2yL";
const signature=" [4acwMXRAcQvLGuxSWKKJhoQtCgymKA24Rrc5Ny88nMgMERRd6Uj4CXYMd8ecE49ZXaA3K1E5W7WsmCEc81YYdsxS,64]";


async function createMyNft()
{
    try{

        const mint=generateSigner(umi);

        let tx=createNft(umi,{
            name:"Carousel",
            mint,
            authority:signer,
            sellerFeeBasisPoints:percentAmount(100),
            isCollection:false,
            uri:METADATA_URI,
        });

        let result=await tx.sendAndConfirm(umi);
        const signature=base58.deserialize(result.signature);

        console.log("✅Done with signature: ", signature);

    }catch(err)
    {
        console.error("[createMyNft] Failed with: ", err);
    }
}

createMyNft();