import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { ed25519 } from "@noble/curves/ed25519";
import { useState, useEffect } from "react";
import { Hide } from "./Hide";
import { Show } from "./Show";
import { ToastContainer } from "react-toastify/unstyled";
import { toast } from "react-toastify";
import { Downarrow } from "./Downarrow";
import { UpArrow } from "./UpArrow";

// Yo global variable ho, jun le track garxa ki mnemonic display bhaeko cha ki chaina
let hasDisplayedMnemonic = false;

interface BlockProps {
  type: "solana" | "ethereum";
}

// Yo function le mnemonic generate garxa ya localStorage bata lincha, ek choti matra run huncha
const initializeMnemonic = (): string[] => {
  const storedMnemonic = localStorage.getItem("globalMnemonic");
  if (storedMnemonic) {
    return storedMnemonic.split(" ");
  } else {
    const mnemonic = generateMnemonic();
    localStorage.setItem("globalMnemonic", mnemonic);
    console.log("Global mnemonic generated:", mnemonic);
    return mnemonic.split(" ");
  }
};

// Yo global variable ho, jaha mnemonic words rakhcha ek choti initialize garera
const globalMnemonicWords = initializeMnemonic();

export const Blockchain = ({ type }: BlockProps) => {
  // Toast notification ko lagi function, copy garda message dekhauncha
  const notify = (text: string) => {
    toast.success(text, {
      autoClose: 2000,
    });
  };

  // Wallet ko type define garxa
  type Wallet = {
    publicKey: string;
    privateKey: string;
  };

  // State haru: wallets store garna, private key show/hide garna, ra mnemonic display garna
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [password, setPassword] = useState(false);
  const [shouldDisplayMnemonic, setShouldDisplayMnemonic] = useState(false);
  const [extend,setextend]=useState(false)

  // Wallet generate garne function
  async function generateWallets() {
    try {
      const seed = mnemonicToSeedSync(globalMnemonicWords.join(" "));
      console.log("Seed generated:", seed.toString("hex"));

      const generatedWallets: Wallet[] = [];
      const path = `m/44'/${type === "solana" ? "501" : "60"}'/0'/0'`;
      console.log("Derivation path:", path);

      const derivedSeed = seed.slice(0, 32);
      const publicKey = await ed25519.getPublicKey(derivedSeed);

      const secret = Buffer.from(derivedSeed).toString("hex");
      const pubkey = Buffer.from(publicKey).toString("hex");

      const wallet = {
        publicKey: pubkey,
        privateKey: secret,
      };
      generatedWallets.push(wallet);

      setWallets(generatedWallets);
    } catch (error) {
      console.error("Error in generateWallets:", error);
    }
  }

  // Yo useEffect component mount huda ek choti run huncha
  useEffect(() => {
    // Check garxa ki mnemonic display bhaeko cha ki chaina
    if (!hasDisplayedMnemonic && globalMnemonicWords.length > 0) {
      setShouldDisplayMnemonic(true);
      hasDisplayedMnemonic = true; // Global flag set garxa taaki aru le nadekhaos
    }
    generateWallets();
  }, []); // Empty array le ek choti matra run garxa mount huda

  // UI render garne part
  return (
    <div className="justify-center items-center">
      {/* Mnemonic dekhaune logic, pahilo instance ma matra dekhincha */}
      {shouldDisplayMnemonic && (
        <div>
          <div className="flex justify-center items-center gap-4">
          <h2 className="items-center justify-center flex text-2xl">Mnemonic Words</h2>
          <div onClick={() => setextend(!extend)}>
          {extend?<Downarrow />:
          <UpArrow />}
          </div>
          </div>
          <ul className="items-center justify-center flex flex-wrap gap-2">
            {extend?"":
            <ul className="grid grid-cols-4 grid-rows-3 gap-2 justify-center m-4">
  {globalMnemonicWords.map((word, wordIndex) => (
    <li key={wordIndex} className="flex justify-center items-center px-12 bg-slate-900 rounded-4xl py-4">
      {word}
    </li>
  ))}
</ul>}
          </ul>
        </div>
      )}
      <div>
        {/* Wallet dekhaune section */}
        <h2 className="items-center justify-center flex">
          Generated {type} Wallets
        </h2>
        {wallets.length === 0 ? (
          <p>No wallets generated yet...</p> // Wallet nahuda yo dekhincha
        ) : (
          wallets.map((wallet, index) => (
            <div
              key={index}
              className="border border-slate-900 rounded-2xl p-4 shadow-lg hover:bg-slate-700 hover:scale-95"
            >
              <p className="items-center justify-center flex font-extrabold bg-slate-600">
                <strong>Wallet {index + 1}:</strong>
              </p>
              <p className="items-center justify-center flex my-4 font-bold">
                Public Key:
                <span className="font-light mx-4 bg-gray-800">
                  {wallet.publicKey}
                </span>
              </p>
              <p className="items-center justify-center flex my-4 font-bold">
                Private Key:
                <input
                  type={password ? "text" : "password"}
                  value={wallet.privateKey}
                  onClick={(e) => {
                    navigator.clipboard.writeText(e.currentTarget.value);
                    notify("Copied to Clipboard");
                  }}
                  readOnly
                  className="w-full bg-gray-800 font-light mx-4 px-2 py-1 rounded focus:outline-none active:copy"
                />
                <div className="" onClick={() => setPassword(!password)}>
                  {password ? <Show /> : <Hide />}
                </div>
              </p>
            </div>
          ))
        )}
      </div>
      <ToastContainer />
    </div>
  );
};