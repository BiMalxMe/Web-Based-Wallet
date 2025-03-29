import { Button } from "./Button";

interface Props {
  solana: () => void;
  etherium: () => void;
}

//Nabujheko Khandama
//bg-gradient-to-r from-purple-400 to-blue-500
// --> yesle k garxa bhanada yesle diyeko text ko purai transverse garda sure delhi mildly color
//   change garda garda color change garxa
// to-r ==> Bhannale Right tira bhaneko ho
//　from-color-shade ==> Yo color suru ma hunx bhane mildy change hudai ==/
// to-blue-500 ==> Yo samma color change hunx bistarai


export const Main = ({ solana, etherium }: Props) => {
  return (
    <div className="flex flex-col items-center text-center sm:pt-20 md:pt-32 px-4">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-blue-500 
                     text-transparent bg-clip-text mb-4 max-w-lg">
        KhaTa Supports Multiple Blockchains
      </h1>

      <p className="text-base sm:text-lg text-gray-300 font-medium tracking-wide max-w-md">
        Select your preferred blockchain to continue
      </p>

      <div className="flex flex-col sm:flex-row w-full max-w-md justify-center items-center gap-4 mt-6">
        <Button text="🚀 Solana" onClick={solana} />
        <Button text="🔥 Ethereum" onClick={etherium} />
      </div>
    </div>
  );
};

