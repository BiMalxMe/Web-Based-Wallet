import { Button } from "./Button"

interface Props {
    solana :() =>void
    etherium :() =>void
}

export const Main = ({solana,etherium}: Props ) => {

    return (
        <div className="flex flex-col items-center pt-40">
      <div className="text-3xl font-extrabold text-slate-400 mb-5">KhaTa Supports Multiple Blockchain</div>
      <div className="text-xl  text-slate-300 font-semibold">Choose One of the Given two</div>
      <div className="flex w-2/4 justify-center items-center gap-4 mt-6">
        <Button text="Solana" onClick={solana}/>
        <Button text="Ethereum" onClick={etherium} />
      </div>
      </div>
    )
}