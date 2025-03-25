import "dotenv/config"
import {createMint} from "@solana/spl-token"
import { clusterApiUrl, Connection } from "@solana/web3.js"
import {getExplorerLink,getKeypairFromEnvironment} from "@solana-developers/helpers"

async function createTokenMint() {

    console.log(`Creating mint ...`);
    
    const connection = new Connection(clusterApiUrl("devnet"));
    const kp=getKeypairFromEnvironment("SECRET_KEY");

    const mint = await createMint(connection,kp,kp.publicKey,null,9);

    const link=getExplorerLink("address",mint.toBase58(),"devnet");

    console.log(`✅ created mint ${link}`);
}

createTokenMint();