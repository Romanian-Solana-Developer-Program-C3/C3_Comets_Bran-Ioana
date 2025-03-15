import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import {
    Connection, 
    LAMPORTS_PER_SOL, 
    PublicKey, 
    clusterApiUrl,
    SystemProgram, 
    Transaction,
    sendAndConfirmTransaction
} from "@solana/web3.js";

const sender=getKeypairFromEnvironment("SECRET_KEY");

const connection=new Connection(clusterApiUrl('devnet'));

console.log(`🗝️Loaded our keypair securely, using an env file! Our public key is: ${sender.publicKey.toBase58()}`);

const recipient=new PublicKey('47fKVddLDt6fHRvS5cT72TnPmvCxKka72QX48QTa3nb7');

console.log(`💸 Attemting to send 0.01 SOL to ${recipient.toBase58()} ...`);

const transaction=new Transaction();

const sendSolInstructions=SystemProgram.transfer({
    fromPubkey: sender.publicKey,
    toPubkey: recipient,
    lamports: LAMPORTS_PER_SOL,
});