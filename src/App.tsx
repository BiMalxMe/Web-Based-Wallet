import { generateMnemonic } from 'bip39';
import './App.css';
import { useState } from 'react';
import { Buffer } from 'buffer';
import { Appbar } from './Components/Appbar';
import { Downarrow } from './Components/Downarrow';
import { UpArrow } from './Components/UpArrow';

// Ensure Buffer is available in the browser
//@ts-ignore
if (!window.Buffer) {
  window.Buffer = Buffer;
}

function App() {
  const [mnemonic, setMnemonic] = useState(''); // Should be a string, not an array
  const [display, setDisplay] = useState(false);

  // Function to generate mnemonic on button click
  const generate = () => {
    const mnemonic = generateMnemonic(); // No need for await, it’s synchronous
    setMnemonic(mnemonic);
  };

  const wordsArray = mnemonic.split(' ');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800 text-white">
      <Appbar />
      <div className="flex flex-col items-center justify-center flex-grow py-20 w-full bg-gray-800">
        <div className="flex items-center gap-3">
          <div>
          <button
            onClick={generate}
            className="active:scale-70 cursor-pointer px-4 py-2 bg-blue-600 rounded text-white hover:bg-blue-800 "
          >
            Generate Mnemonic
          </button>
          </div>
          <div 
            onClick={() => setDisplay(!display)} 
            className="cursor-pointer"
          >
            {display ? <UpArrow /> : <Downarrow />}
          </div>
        </div>

        {display && (
          <div className="flex justify-center top-20 left-50 w-1/4 flex-wrap mt-6 bg-red-600 resize:both overflow-scroll">
            {wordsArray.map((word, index) => (
              <div
                key={index}
                className="py-6 w-20 px-4 m-2 bg-blue-800 border border-black rounded-md flex items-center justify-center text-center"
              >
                {word}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
