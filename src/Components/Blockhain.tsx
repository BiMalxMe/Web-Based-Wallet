import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { ed25519 } from "@noble/curves/ed25519";
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
      for (let i = 0; i < 1; i++) {
        const path = `m/44'/${type === "solana" ? "501" : "60"}'/${i}'/0'`;
        console.log("Derivation path:", path); // Debug path

        //  Use only the first 32 bytes of the seed for key generation
        const derivedSeed = seed.slice(0, 32);
        console.log("Derived seed:", Buffer.from(derivedSeed).toString("hex")); // Debug derived seed

        //  Generate key pair using @noble/ed25519
        const publicKey = await ed25519.getPublicKey(derivedSeed);
        console.log("Keypair public key:", Buffer.from(publicKey).toString("hex")); // Debug public key

        const secret = Buffer.from(derivedSeed).toString("hex");
        const pubkey = Buffer.from(publicKey).toString("hex");

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
    <div className="">
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
