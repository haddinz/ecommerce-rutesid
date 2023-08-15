import { ButtonHTMLAttributes } from "react";

interface btn extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  condition: string;
  onClickHandler?: () => void;
}

function Button({ text, condition, onClickHandler }: btn) {
  const on =
    "bg-amber-500 hover:bg-amber-800 text-amber-800 hover:text-amber-500 text-center transition w-full p-4 text-medium font-bold rounded-lg hover:scale-105";
  const off =
    "w-full p-4 bg-rose-700 text-gray-200 text-medium font-bold rounded-lg text-center cursor-not-allowed";
  const mode = condition === "on" ? on : off;
  const disabled = mode === off ? true : false;

  return (
    <button
      className={`bg- ${mode}`}
      onClick={onClickHandler}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default Button;
