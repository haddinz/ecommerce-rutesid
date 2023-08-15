import { useState } from "react";
import Icon from "../custom/icon";
import { useNavigate } from "react-router-dom";

export default function SearchBox(props: {slug: string}) {
  const { slug } = props
  const navigate = useNavigate();
  const submitHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    navigate(query ? `/admin/${slug}?query=${query}` : "");
  };
  const [query, setQuery] = useState("");
  return (
    <div className="gradient">
      <form
        onSubmit={submitHandler}
        className="flex p-1 md:p-2 rounded-lg items-center text-black bg-gradient-to-r from-color60 to-color10 w-full h-[50px]"
      >
        <Icon.Search />
        <input
          className="text-xs text-white bg-transparent md:text-base rounded-lg ml-4 border-none focus:outline-none w-full"
          type="text"
          name="search"
          id="search"
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`search ${slug}`}
          aria-label="Search Vite.ID"
          aria-describedby="button-search"
        />
        <button type="submit" />
      </form>
    </div>
  );
}

