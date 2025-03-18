import { generateMnemonic } from 'bip39';
import './App.css';
import { useState } from 'react';
import { Buffer } from 'buffer';
import { Appbar } from './Components/Appbar';
import { Downarrow } from './Components/Downarrow';

// Ensure Buffer is available in the browser
//@ts-ignore
if (!window.Buffer) {
  window.Buffer = Buffer;
}

function App() {
  const [mnemonic, setMnemonic] = useState(''); // Should be a string, not an array
  const [display,setDisplay] = useState(true)

  // Function to generate mnemonic on button click
  const generate = () => {
    const mnemonic = generateMnemonic(); // No need for await, it’s synchronous
    setMnemonic(mnemonic);
  };

  const wordsArray = mnemonic.split(' ');
  console.log(wordsArray);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800 text-white">
      <Appbar />
      <div className="flex flex-col items-center justify-center flex-grow py-20 w-full bg-gray-800">
      <div className='flex items-center gap-3'>
        <button
          onClick={generate}
          className="px-4 py-2 bg-blue-600 rounded text-white hover:bg-blue-800 transition"
        >
          Generate Mnemonic
        </button>
        <div onClick={setDisplay(true)}>
        <Downarrow />
        </div>
        </div>
        <div className='flex justify-center w-2/4 flex-wrap'>
        {wordsArray.map(word => <div className='py-6 w-6 px-10 m-4 gap-1.5 bg-blue-800 border flex border-black rounded-md items-center justify-center flex-wrap'> {word} </div>)}
        </div>
      </div>
    </div>
  );
}

export default App;

