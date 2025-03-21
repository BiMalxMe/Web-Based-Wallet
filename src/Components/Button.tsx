
interface ButtonProps{
    onClick?: () => void;
    text :string;
    color? : string
}

export const Button= ({text,onClick,color} : ButtonProps) => {
    return (
        <button
        onClick={onClick}
        className={`text-xl active:scale-70 cursor-pointer px-6 py-4 ${color == null ? "bg-white" : "bg-" + color + "-700"} rounded-3xl text-black hover:bg-slate-200`}>
        {text}
      </button>
    )
}