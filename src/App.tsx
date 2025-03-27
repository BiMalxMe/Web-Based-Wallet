
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import { useState } from "react";
import { Buffer } from "buffer";
import { Appbar } from "./Components/Appbar";
import { Main } from "./Components/Main";
import { AddDelWallet } from "./Components/AddDelWallet";

// Ensure Buffer is available in the browser
//@ts-ignore
if (!window.Buffer) {
  window.Buffer = Buffer;
}

function App() {
  const [block,setBlock] = useState("")
  

  
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-700 text-white pt-20">
          <ToastContainer/>

      <Appbar />
      {block ? (
        <div>
          {/* <Blockchain type="solana" /> */}
          < AddDelWallet type={block}/>
        </div>
      ) : (
        ""
      )}

    
        <Main
          solana={() => setBlock("solana")}
          etherium={() => setBlock("etherium")}
        />
   
    </div>
  );
}

export default App;
