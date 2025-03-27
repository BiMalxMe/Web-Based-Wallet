
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

    {!block?
        <Main
          solana={() => setBlock("solana")}
          etherium={() => setBlock("etherium")}
        />
      :""}

<div className="mt-auto w-full text-center py-2 bg-gray-800">
   <span className='text-xl  justify-center items-center'>&copy;</span> <span>
   Designed and Develped by Bimal Chalise
    </span>
  </div>
    </div>
  );
}

export default App;
