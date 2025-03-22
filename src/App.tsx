import { generateMnemonic } from "bip39";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import { useState } from "react";
import { Buffer } from "buffer";
import { Appbar } from "./Components/Appbar";
import { Downarrow } from "./Components/Downarrow";
import { UpArrow } from "./Components/UpArrow";
import { Button } from "./Components/Button";
import { Main } from "./Components/Main";
import { Blockchain } from "./Components/Blockhain";
import { Check } from "./Components/Check";
import { AddDelWallet } from "./Components/AddDelWallet";

// Ensure Buffer is available in the browser
//@ts-ignore
if (!window.Buffer) {
  window.Buffer = Buffer;
}

function App() {
  const [solana, setSolana] = useState(false);
  console.log(solana);
  const [etherium, setEtherium] = useState(false);
  const [mnemonic, setMnemonic] = useState(""); // Should be a string, not an array
  const [display, setDisplay] = useState(false);

  const wordsArray = mnemonic.split(" ");
  console.log(wordsArray);
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-700 text-white pt-20">
          <ToastContainer/>

      <Appbar />
      {solana ? (
        <div>
          {/* <Blockchain type="solana" /> */}
          < AddDelWallet />
        </div>
      ) : (
        ""
      )}

      {!solana ? (
        <Main
          solana={() => setSolana(true)}
          etherium={() => setEtherium(true)}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
