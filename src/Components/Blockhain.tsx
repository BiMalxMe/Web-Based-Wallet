import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { ed25519 } from "@noble/curves/ed25519";
import { useState, useEffect } from "react";
import { Hide } from "./Hide";
import { Show } from "./Show";
import { ToastContainer } from "react-toastify/unstyled";
import { toast } from "react-toastify";
interface BlockProps {
  type: "solana" | "ethereum";
}

export const Blockchain = ({ type }: BlockProps) => {

  const notify = (text : String) => {
    toast.success(text, {
      autoClose: 2000, // 3 seconds
    });  }

  type Wallet = {
    publicKey: string;
    privateKey: string;
  };

  //Yesma sabai bhanda badi time dubug ma lagyo khai old dependecny vayera ho ki k

  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [wordsArray, setWordsArray] = useState<string[][]>([]);
  const [password, setPasword] = useState(false);

  async function generateWallets() {
    try {
      const mnemonic = generateMnemonic();
      const seed = mnemonicToSeedSync(mnemonic);
       // Store mnemonic words
       const mnemonicWords = mnemonic.split(" ");
       setWordsArray([mnemonicWords]);
       console.log("Mnemonic words:", mnemonicWords);
      console.log("Seed generated:", seed.toString("hex")); // Debug seed

     

      const generatedWallets: Wallet[] = [];
      for (let i = 0; i < 1; i++) {
        const path = `m/44'/${type === "solana" ? "501" : "60"}'/${i}'/0'`;
        console.log("Derivation path:", path); // Debug path

        //  Use only the first 32 bytes of the seed for key generation
        const derivedSeed = seed.slice(0, 32);
        console.log("Derived seed:", Buffer.from(derivedSeed).toString("hex")); // Debug derived seed

        //  Generate key pair using @noble/ed25519
        const publicKey = await ed25519.getPublicKey(derivedSeed);
        console.log(
          "Keypair public key:",
          Buffer.from(publicKey).toString("hex")
        ); // Debug public key

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
    <div className="justify-center items-center">
      <div>
        <h2 className="items-center justify-center flex">Mnemonic Words</h2>
        <ul className="items-center justify-center flex">
        {wordsArray.map((words, index) => (
  <div key={index}>
    {words.map((word, wordIndex) => (
      <div key={wordIndex}>
        {word}
      </div>
    ))}
  </div>
))}

        </ul>
      </div>
      <div>
        <h2 className="items-center justify-center flex ">
          Generated {type} Wallets
        </h2>
        {wallets.length === 0 ? (
          <p>No wallets generated yet...</p>
        ) : (
          wallets.map((wallet, index) => (
            <div
              key={index}
              className="border border-slate-900 rounded-2xl p-4 shadow-lg  hover:bg-slate-700 hover:scale-95"
            >
              <p className="items-center justify-center flex font-extrabold bg-slate-600">
                <strong>Wallet {index + 1}:</strong>
              </p>
              <p className="items-center justify-center flex my-4 font-bold">
                Public Key:
                <span className="font-light mx-4 bg-gray-800">
                  {wallet.publicKey}
                </span>{" "}
              </p>
              <p className="items-center justify-center flex my-4 font-bold">
                Private Key:{" "}
                <input
                  type={password?"text":"password"}
                  value={wallet.privateKey}
                  onClick={(e:React.MouseEvent<HTMLInputElement>)=>{navigator.clipboard.writeText(e.target.value);
                    notify("Copied to Clipboard");<ToastContainer />
                  }}
                  readOnly
                  className="w-full bg-gray-800 font-light mx-4 px-2 py-1 rounded focus:outline-none active:copy"
                />
                <div className="" onClick={() => setPasword(!password)}>
                  {password ? <Show /> : <Hide />}
                </div>
              </p>
              <p className="items-center justify-center flex"></p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
