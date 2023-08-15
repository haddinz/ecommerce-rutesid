import React, { useState } from "react";
import Icon from "./icon";

function Dropdown({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative mb-2">
      <button
        onClick={() => setIsOpen((isOpen) => !isOpen)}
        className="bg-sky-300 dark:bg-sky-700 p-3 w-full items-center flex justify-between rounded active:text-white duration-300 font-semibold mb-2"
      >
        {title}
        {isOpen ? <Icon.Down /> : <Icon.Up />}
      </button>

      {isOpen && (
        <div className="flex flex-col bg-gray-300 dark:bg-gray-700 p-3 w-full rounded active:text-white duration-300 font-semibold">
          {children}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
