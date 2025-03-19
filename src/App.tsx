import { generateMnemonic } from "bip39";
import "./App.css";
import { useState } from "react";
import { Buffer } from "buffer";
import { Appbar } from "./Components/Appbar";
import { Downarrow } from "./Components/Downarrow";
import { UpArrow } from "./Components/UpArrow";
import { Button } from "./Components/Button";
import { Main } from "./Components/Main";

// Ensure Buffer is available in the browser
//@ts-ignore
if (!window.Buffer) {
  window.Buffer = Buffer;
}

function App() {
  const [solana, setSolana] = useState(true);
  console.log(solana)
  const [etherium, setEtherium] = useState(false);
  const [mnemonic, setMnemonic] = useState(""); // Should be a string, not an array
  const [display, setDisplay] = useState(false);

  // Function to generate mnemonic on button click
  const generate = () => {
    const mnemonic = generateMnemonic(); // No need for await, it’s synchronous
    setMnemonic(mnemonic);
    // console.log("Request Reached here")
  };

  const wordsArray = mnemonic.split(" ");
  console.log(wordsArray);
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-800 text-white pt-20">
      <Appbar />
      {(solana)?
      <Main solana={() => setSolana(true)} etherium={() => setEtherium(true)}/>
    :""}
    </div>
  );
  
}

export default App;
