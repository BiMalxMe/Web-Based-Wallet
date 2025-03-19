
interface ButtonProps{
    onClick?: () => void;
    text :string;
}

export const Button= ({text,onClick} : ButtonProps) => {
    return (
        <button
        onClick={onClick}
        className="text-xl active:scale-70 cursor-pointer px-6 py-4 bg-white rounded-3xl text-black hover:bg-slate-200  "
      >
        {text}
      </button>
    )
}