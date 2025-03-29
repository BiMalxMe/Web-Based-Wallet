import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { HDKey } from "@scure/bip32"; // Replace ed25519-hd-key with this
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
import { Buffer } from 'buffer'; // Import Buffer from buffer package

enum clickProp {
  yes,
  no
}
let hasDisplayedMnemonic = false;

if (typeof window !== 'undefined') {
  window.Buffer = window.Buffer || Buffer;
}

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

export const Blockchain = ({ type }: BlockProps) => {
  
  
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
  const [clicked,setClicked] = useState<clickProp >(clickProp.no)


  // Wallet generate garne function  
  const generateWallets = async () => {
    try {
      const seed = mnemonicToSeedSync(globalMnemonicWords.join(" ")); // Mnemonic bata seed generate garne  
      
      // Use @scure/bip32 for derivation
      const derivationPath = `m/44'/${type === "solana" ? 501 : 60}'/${wallets.length}'/0'`;
      const masterKey = HDKey.fromMasterSeed(seed);
      const derivedKey = masterKey.derive(derivationPath);
      const derivedSeed = derivedKey.privateKey; // Get the derived private key
      
      if (!derivedSeed) throw new Error("Failed to derive private key");
      
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
    <div className="justify-center items-center px-4 sm:px-6 md:px-8">
      {/* Wallet generate garne button */}
      <div className="flex justify-center gap-4 my-4">
        <Button text="Add Wallet" onClick={()=>{generateWallets();setClicked(clickProp.yes)
}} />
      </div>
      
      {/* Mnemonic words display garne */}
      {shouldDisplayMnemonic && (
        <div>
          <div className="flex justify-between items-center gap-4 bg-slate-900 rounded-2xl w-full px-4 py-2">
            <h2 className="text-xl sm:text-2xl text-white">Mnemonic Words</h2>
            <div className="hover:bg-slate-700 rounded-full p-2 cursor-pointer" onClick={() => setExtend(!extend)}>
              {extend ? <Downarrow /> : <UpArrow />}
            </div>
          </div>

          {/* Mnemonic words hidden xa bhane display garne */}
          {!extend && (
            <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 m-4">
              {globalMnemonicWords.map((word, index) => (
                <li key={index} className="px-6 py-4 bg-slate-900 rounded-xl text-center text-sm sm:text-base">
                  {word}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      
      {/* Generated wallets display garne */}
      <div>
        {clicked === clickProp.yes ? (
          <h2 className="flex justify-center items-center bg-slate-800 rounded-br-full rounded-bl-full mt-4 p-4 ">
            Generated {type} Wallets
          </h2>
        ) : ""}

       {/* Wallet generate vako xa ki xaina check garne */}
{wallets.length === 0 ? (
  <div className="w-full">
    <p className="text-center text-sm sm:text-base bg-gradient-to-r from-blue-400 to-teal-300 bg-clip-text text-transparent font-medium py-2">No wallets generated yet...</p>
  </div>
) : (
  wallets.map((wallet, index) => (
    <div key={index} className="relative border border-slate-900 rounded-2xl p-3 md:p-4 shadow-lg hover:bg-slate-700 transition-all my-3 md:my-4 flex flex-col w-full">
      <p className="text-center font-extrabold bg-slate-600 py-1 px-2 rounded-t-lg text-sm md:text-base w-full">Wallet {index + 1}</p>
      <div className="flex flex-col justify-between gap-2 md:gap-4 w-full">
        <div className="w-full">
          {/* Public Key display */}
          <div className="my-2 md:my-4 w-full">
            <p className="text-sm md:text-base font-bold mb-1">Public Key:</p>
            <div className="w-full bg-gray-800 p-2 rounded text-xs md:text-sm font-light break-all">
              {wallet.publicKey}
            </div>
          </div>
          
          {/* Private Key display */}
          <div className="my-2 md:my-4 w-full">
            <p className="text-sm md:text-base font-bold mb-1">Private Key:</p>
            <div className="flex items-center w-full">
              <input
                type={password ? "text" : "password"}
                value={wallet.privateKey}
                onClick={(e) => {
                  navigator.clipboard.writeText(e.currentTarget.value);
                  notify("Copied to Clipboard");
                }}
                readOnly
                className="flex-1 bg-gray-800 font-light px-2 py-1 rounded text-xs md:text-sm focus:outline-none cursor-pointer truncate"
              />
              <button 
                onClick={() => setPassword(!password)}
                className="ml-2 p-1"
              >
                {password ? <Show /> : <Hide />}
              </button>
            </div>
          </div>
        </div>
  
        {/* Delete button */}
        <div className="flex justify-center mt-2 w-full">
          <button
            onClick={() => deleteWallet(index)}
            className="text-red-500 hover:text-red-700 px-10 py-2 rounded-full hover:bg-slate-800 transition-colors"
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
