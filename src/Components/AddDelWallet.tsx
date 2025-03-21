import { useState } from "react";
import { Button } from "./Button";
import { Blockchain } from "./Blockhain";

enum stateProp {
  add,
  delete,
}

export const AddDelWallet = () => {
  const [status, setStatus] = useState<stateProp | undefined>();

  return (
    <div className="min-h-screen">
      <div className="bg-emerald-400 p-4 flex justify-center items-center">
        <div>
        <div className="flex gap-4">
          <Button text="Add Wallet" onClick={() => setStatus(stateProp.add)} />
          <Button
            text="Delete Wallet"
            onClick={() => setStatus(stateProp.delete)}
          />
        </div>

      
      </div>
    </div>
    <div className="flex justify-center items-center">

    <Blockchain type="solana"/>
    </div>

    </div>

  );
};


// return (
//     <div>
//     <div className="pt-20 p-4 flex gap-4 fixed">
//       <div className="">
//         <Button text="Add Wallet" onClick={()=>setstatus(stateProp.add)}/>
//       </div>
//       <div>
//         <Button text="Delete Wallet" onClick={()=>setstatus(stateProp.delete)} />
//       </div>
//     </div>
//     <div>
//     <Blockchain type="solana"/>
//     </div>
//     </div>
//   );
