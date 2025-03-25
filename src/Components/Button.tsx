
interface ButtonProps{
    onClick?: () => void;
    text :string;
    color? : string
}

export const Button= ({text,onClick,color} : ButtonProps) => {
    return (
        <button
        onClick={onClick}
        className={`text-xl active:scale-70 cursor-pointer px-6 py-4  bg-slate-900  text-white hover:bg-gray-900 active:scale-75 rounded-3xl`}>
        {text}
      </button>
    )
}