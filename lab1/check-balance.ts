import "dotenv/config";

import {
    Connection, 
    LAMPORTS_PER_SOL, 
    PublicKey, 
    clusterApiUrl
} from "@solana/web3.js";

import { airdropIfRequired, getKeypairFromEnvironment } from "@solana-developers/helpers";

const keypair = getKeypairFromEnvironment("SECRET_KEY");
const connection=new Connection(clusterApiUrl('devnet'));

const pubKey=keypair.publicKey;

const balanceInLamports=await connection.getBalance(pubKey);

console.log(`${pubKey.toString()} has balance ${balanceInLamports} lamports.`);
