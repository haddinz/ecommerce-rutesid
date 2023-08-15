import React from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "../custom/icon";

function ButtonAdmin({
  children,
  slug,
  icon,
}: {
  children: React.ReactNode;
  slug?: string;
  icon?: React.ReactElement;
}) {
  const curentPath = useLocation().pathname;
  return (
    <div
      className={`cursor-pointer text-white ${
        curentPath === `${`/admin/${slug}`}` &&
        "bg-gradient-to-t from-color10 to-color30 py-[1px]"
      }`}
    >
      <div
        className={`w-full py-5 pl-10 active:text-black ${
          curentPath === `${`/admin/${slug}`}`
            ? "bg-color60 opacity-95"
            : "text-gray-500"
        }`}
      >
        <Link to={`/admin/${slug}`} className="flex items-center ">
          <div>{icon ? icon : <Icon.Hamburger />}</div>
          <div className="text-sm ml-10">{children}</div>
        </Link>
      </div>
    </div>
  );
}

export default ButtonAdmin;
