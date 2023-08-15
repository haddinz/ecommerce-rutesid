import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Icon from "./icon";

export default function SearchBox() {
  const navigate = useNavigate();
  const curentPath = useLocation().pathname;
  const [query, setQuery] = useState("");
  const submitHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    navigate(query ? `/search?query=${query}` : " ");
  };
  return (
    <>
      {curentPath === "/" ||
      curentPath === "/cart/cartPage" ||
      curentPath.startsWith("/search") ||
      curentPath.startsWith("/product/slug/") ? (
        <form
          onSubmit={submitHandler}
          className="flex p-2 md:p-3 rounded-lg items-center text-black border-2 border-sky-700 bg-white w-full md:w-4/6"
        >
          <Icon.Search />
          <input
            className="text-sm md:text-base rounded-lg ml-4 border-none focus:outline-none w-full"
            type="text"
            name="search"
            id="search"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Product"
            aria-label="Search Vite.ID"
            aria-describedby="button-search"
          />
          <button type="submit" />
        </form>
      ) : null}
    </>
  );
}
