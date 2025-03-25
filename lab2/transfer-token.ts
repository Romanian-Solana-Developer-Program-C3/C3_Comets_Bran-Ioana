import "dotenv/config"
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js"
import {getExplorerLink,getKeypairFromEnvironment} from "@solana-developers/helpers"
import { getAssociatedTokenAddressSync, getOrCreateAssociatedTokenAccount, transferChecked } from "@solana/spl-token"

const MINT=new PublicKey("Q4jTtsUCrAYTzoCzkeftWfxbqG2BGbxAm3PjnJFaTv5");
const SRC=new PublicKey("9MZiWj6Zm7PZspacsnGGKxcfDQT5awSziGRpoqnjEXck");
const DEST=new PublicKey("");

async function transferToken(mint:PublicKey, source:PublicKey, dest:PublicKey, amount:number)
{
    console.log(`Transfering token ${mint} ...`);

    const connection = new Connection(clusterApiUrl("devnet"));
    const kp=getKeypairFromEnvironment("SECRET_KEY");

    const sourceAta= getAssociatedTokenAddressSync(mint,source);
    const destAta=  await getOrCreateAssociatedTokenAccount(connection,kp,mint,dest);

    const sig=await transferChecked(connection,kp,sourceAta,mint,destAta.address,kp,amount,9);
    
    const link=getExplorerLink("tx",sig,"devnet");
    
    console.log(`✅Done with link : ${link}`);
}

transferToken(MINT,SRC, DEST, 1*10*10**9);