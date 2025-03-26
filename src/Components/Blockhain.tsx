import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { ed25519 } from "@noble/curves/ed25519";
import { useState, useEffect } from "react";
import { Hide } from "./Hide";
import { Show } from "./Show";
import { ToastContainer } from "react-toastify/unstyled";
import { toast } from "react-toastify";
import { Downarrow } from "./Downarrow";
import { UpArrow } from "./UpArrow";
import { Button } from "./Button";
import { Delete } from "./Delete";

let hasDisplayedMnemonic = false;

// Blockchain component ko props ko type define garne  
interface BlockProps {
  type: "solana" | "ethereum"; // Blockchain ko type define garne 
  generated: "yes" | "no"; // Wallet generate vayo ki vayena  
}

// Mnemonic words initialize garne function  
const initializeMnemonic = (): string[] => {
  const storedMnemonic = localStorage.getItem("globalMnemonic"); 
  if (storedMnemonic) {
    return storedMnemonic.split(" "); // Store gareko mnemonic return garne  
  } else {
    const mnemonic = generateMnemonic(); // Naya mnemonic generate garne  
    localStorage.setItem("globalMnemonic", mnemonic); // Local storage ma save garne  
    return mnemonic.split(" "); // Array format ma return garne  
  }
};

// Mnemonic words globally store garne  
const globalMnemonicWords = initializeMnemonic();

export const Blockchain = ({ type, generated }: BlockProps) => {
  const clicked = generated;
  console.log(clicked);

  // Toast message display garne function  
  const notify = (text: string) => {
    toast.success(text, { autoClose: 2000 });
  };

  type Wallet = {
    publicKey: string;
    privateKey: string;
  };

  // State variables define garne  
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [password, setPassword] = useState(false);
  const [shouldDisplayMnemonic, setShouldDisplayMnemonic] = useState(false);
  const [extend, setExtend] = useState(false);

  // Wallet generate garne function  
  const generateWallets = async () => {
    try {
      const seed = mnemonicToSeedSync(globalMnemonicWords.join(" ")); // Mnemonic bata seed generate garne  
      const derivedSeed = seed.slice(0, 32); // Seed lai slice garne  
      const publicKey = await ed25519.getPublicKey(derivedSeed); // Public key generate garne  
      
      const newWallet: Wallet = {
        publicKey: Buffer.from(publicKey).toString("hex"),
        privateKey: Buffer.from(derivedSeed).toString("hex"),
      };
      
      setWallets([...wallets, newWallet]); // New wallet state update garne  
    } catch (error) {
      console.error("Error generating wallet:", error);
    }
  };

  // Wallet delete garne function  
  const deleteWallet = (index: number) => {
    setWallets(wallets.filter((_, i) => i !== index)); // Select gareko wallet remove garne  
    notify("Wallet deleted"); // Toast message display garne  
  };

  // Mnemonic words display garne logic  
  useEffect(() => {
    if (!hasDisplayedMnemonic && globalMnemonicWords.length > 0) {
      setShouldDisplayMnemonic(true);
      hasDisplayedMnemonic = true;
    }
  }, []);

  return (
    <div className="justify-center items-center">
      {/* Wallet generate garne button */}
      <div className="flex justify-center gap-4 my-4">
        <Button text="Add Wallet" onClick={generateWallets} />
      </div>
      
      {/* Mnemonic words display garne */}
      {shouldDisplayMnemonic && (
        <div>
          <div className="flex justify-center items-center gap-4 bg-slate-900 rounded-2xl w-full px-4 py-2">
            <h2 className="text-2xl text-white">Mnemonic Words</h2>
            <div className="hover:bg-slate-700 rounded-full p-2 cursor-pointer" onClick={() => setExtend(!extend)}>
              {extend ? <Downarrow /> : <UpArrow />}
            </div>
          </div>

          {/* Mnemonic words hidden xa bhane display garne */}
          {!extend && (
            <ul className="grid grid-cols-4 gap-2 m-4">
              {globalMnemonicWords.map((word, index) => (
                <li key={index} className="px-12 bg-slate-900 rounded-xl py-4 text-center">
                  {word}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      
      {/* Generated wallets display garne */}
      <div>
        {clicked === "yes" ? (
          <h2 className="flex justify-center bg-slate-800 rounded-br-full rounded-bl-full m-4 py-2">
            Generated {type} Wallets
          </h2>
        ) : ""}

        {/* Wallet generate vako xa ki xaina check garne */}
        {wallets.length === 0 ? (
          <p className="text-center">No wallets generated yet...</p>
        ) : (
          wallets.map((wallet, index) => (
            <div key={index} className="relative border border-slate-900 rounded-2xl p-4 shadow-lg hover:bg-slate-700 hover:scale-100 my-4 flex flex-col">
              <p className="text-center font-extrabold bg-slate-600">Wallet {index + 1}</p>
              <div className="flex">
                <div>
                  {/* Public Key display garne */}
                  <p className="text-center my-4 font-bold">
                    Public Key: <span className="font-light mx-4 bg-gray-800">{wallet.publicKey}</span>
                  </p>
                  
                  {/* Private Key display garne */}
                  <p className="flex justify-center items-center my-4 font-bold">
                    Private Key:
                    <input
                      type={password ? "text" : "password"}
                      value={wallet.privateKey}
                      onClick={(e) => {
                        navigator.clipboard.writeText(e.currentTarget.value);
                        notify("Copied to Clipboard"); // Copy gareko vaye message dekhaune  
                      }}
                      readOnly
                      className="w-full bg-gray-800 font-light mx-4 px-2 py-1 rounded focus:outline-none cursor-pointer"
                    />
                    <div onClick={() => setPassword(!password)}>
                      {password ? <Show /> : <Hide />}
                    </div>
                  </p>
                </div>

                {/* Wallet delete garne button */}
                <div className="border-red-500 rounded-full w-10 h-10 flex items-center justify-center hover:bg-slate-900 active:bg-slate-700">
                  <button
                    onClick={() => deleteWallet(index)}
                    className="top-4 right-1 text-red-500 hover:text-red-700 align-top flex m-4 justify-center items-center"
                  >
                    <Delete />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* Toast notifications display garne */}
      <ToastContainer />
    </div>
  );
};
