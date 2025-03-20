import nacl from "tweetnacl";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import { useState, useEffect } from "react";

interface BlockProps {
  type: "solana" | "ethereum";
}

export const Blockchain = ({ type }: BlockProps) => {
  type Wallet = {
    publicKey: string;
    privateKey: string;
  };

  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [wordsArray, setWordsArray] = useState<string[][]>([]);

  async function generateWallets() {
    try {
      const mnemonic = generateMnemonic();
      const seed = mnemonicToSeedSync(mnemonic);
      console.log("Seed generated:", seed.toString("hex")); // Debug seed

      // Store mnemonic words
      const mnemonicWords = mnemonic.split(" ");
      setWordsArray([mnemonicWords]);
      console.log("Mnemonic words:", mnemonicWords);

      const generatedWallets: Wallet[] = [];
      for (let i = 0; i < 4; i++) {
        const path = `m/44'/${type === "solana" ? "501" : "60"}'/${i}'/0'`;
        console.log("Derivation path:", path); // Debug path
        const derivedSeed = derivePath(path, seed.toString("hex")).key;
        console.log("Derived seed:", derivedSeed.toString("hex")); // Debug derived seed

        const keyPair = nacl.sign.keyPair.fromSeed(derivedSeed);
        console.log("Keypair public key:", Buffer.from(keyPair.publicKey).toString("hex")); // Debug keypair

        const secret = Buffer.from(keyPair.secretKey).toString("hex");
        const pubkey = Keypair.fromSecretKey(keyPair.secretKey).publicKey.toBase58();

        const wallet = {
          publicKey: pubkey,
          privateKey: secret,
        };
        console.log("Generated wallet:", wallet); // Debug each wallet
        generatedWallets.push(wallet);
      }

      console.log("Final generated wallets:", generatedWallets); // Debug final array
      setWallets(generatedWallets); // Update state
    } catch (error) {
      console.error("Error in generateWallets:", error);
    }
  }

  useEffect(() => {
    console.log("useEffect triggered with type:", type);
    generateWallets();
  }, [type]);

  useEffect(() => {
    console.log("Wallets state updated:", wallets);
  }, [wallets]);

  return (
    <div>
      <h2>Generated {type} Wallets</h2>
      {wallets.length === 0 ? (
        <p>No wallets generated yet...</p>
      ) : (
        wallets.map((wallet, index) => (
          <div key={index}>
            <p><strong>Wallet {index + 1}:</strong></p>
            <p>Public Key: {wallet.publicKey}</p>
            <p>Private Key: {wallet.privateKey}</p>
          </div>
        ))
      )}

      <h2>Mnemonic Words</h2>
      <ul>
        {wordsArray.length === 0 ? (
          <li>No mnemonic generated yet...</li>
        ) : (
          wordsArray.map((words, index) => (
            <li key={index}>{words.join(" ")}</li>
          ))
        )}
      </ul>
    </div>
  );
};