import { useState } from "react";
import { Button } from "./Button";
import { Blockchain } from "./Blockhain";

enum stateProp {
  show,
  hide,
  add,
}
enum clickProp {
  yes,
  no
}

export const AddDelWallet = () => {
  const [status, setStatus] = useState<stateProp | undefined>(stateProp.show); // Wallet add ya delete garne state track garxa
  const [clicked,setClicked] = useState<clickProp >(clickProp.no)
  return (
    <div className="min-h-screen">
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
                setClicked(clickProp.yes)
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
  <Blockchain type="solana" generated={clicked === clickProp.yes ? "yes" : "no"} />
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
