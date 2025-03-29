interface ButtonProps {
    onClick?: () => void;
    text: string;
    color?: string;
  }
  
  export const Button = ({ text, onClick }: ButtonProps) => {
    return (
      <button
        onClick={onClick}
        className="text-xl cursor-pointer px-6 py-4 bg-slate-900 text-white hover:bg-gray-800 active:scale-90 
                   rounded-3xl transition-all duration-300 shadow-lg hover:shadow-xl hover:opacity-90">
        {text}
      </button>
    );
  };
  