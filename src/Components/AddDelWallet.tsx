import { useState } from "react";
import { Button } from "./Button";
import { Blockchain } from "./Blockhain";

enum stateProp {
  show,
  hide,
  add,
}


export const AddDelWallet = ({type}:{type:string}) => {
  const [status, setStatus] = useState<stateProp | undefined>(stateProp.show); // Wallet add ya delete garne state track garxa
  return (
    <div className="mt-10 p-8 rounded-bl-4xl rounded-tr-4xl flower-bg bg-cyan-900 mb-10">
  
   
      {/* Upar ko section jaha button haru cha */}
      <div className=" flex justify-center items-center">
        <div className="flex gap-4">
          {/* Add Wallet click garda status update huncha */}
          {status == stateProp.show ? (
            <Button
              text="Start Generating"
              onClick={() => {
                setStatus(stateProp.show);
                setStatus(stateProp.hide);
                setTimeout(() => {
                  setStatus(stateProp.add);
                },100);
              }}
              color="slate"
            />
          ) : (
            ""
          )}
          {/* Delete Wallet click garda status update huncha but delete functionality define vayeko xaina */}
        </div>
      </div>

      {/* Blockchain component display garne thau */}
      <div className="flex justify-center items-center mt-4">
        {/* Jaba status "add" huncha taba matra Blockchain component render huncha */}
        {status === stateProp.add && (
          // @ts-ignore
  <Blockchain type={type} />
)}
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
