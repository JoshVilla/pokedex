import React, { useEffect, useMemo, useState } from "react";
import { findPokemon, getPokemons } from "../../utils/api";
import PokeCard from "../../components/pokeCard";
import { Link } from "react-router-dom";
import { IPokeData } from "../../types";

interface IPokeList {
  name: string;
  id: string;
}
const Home = () => {
  const pokemonList = JSON.parse(localStorage.getItem("pokemons") || "[]");
  const [pokeName, setPokeName] = useState<string>("");
  const [data, setData] = useState<IPokeData[]>([]);
  const [prevPageUrl, setPrevPageUrl] = useState<string>("");
  const [nextPageUrl, setNextPageUrl] = useState<string>("");
  const [suggestions, setSuggestions] = useState<IPokeList[]>([]);

  const gSuggestions = useMemo(() => {
    return pokemonList.filter((i: IPokeList) => i.name.startsWith(pokeName));
  }, [pokeName]);

  useEffect(() => {
    getPokemons().then((res) => {
      if (res) {
        setData(res.data.results);
        setPrevPageUrl(res.data.previous || "");
        setNextPageUrl(res.data.next);
      }
    });
  }, []);

  const handlePrevPage = () => {
    getPokemons(prevPageUrl).then((res) => {
      if (res) {
        setData(res.data.results);
        setPrevPageUrl(res.data.previous);
        setNextPageUrl(res.data.next);
      }
    });
  };

  const handleNextPage = () => {
    getPokemons(nextPageUrl).then((res) => {
      if (res) {
        setData(res.data.results);
        setPrevPageUrl(res.data.previous || "");
        setNextPageUrl(res.data.next);
      }
    });
  };

  const handleQuery = (e: any) => {
    e.preventDefault();
    findPokemon(pokeName).then((res) => {
      setData(res.data.results);
      setPrevPageUrl("");
      setNextPageUrl("");
    });
  };

  const suggestList = () => {
    setSuggestions(gSuggestions);
  };

  return (
    <div className="w-full">
      <div className="w-1/4 my-10 mx-auto relative">
        <form action="" className=" flex">
          <input
            value={pokeName}
            type="text"
            className="w-full py-1 px-3 rounded-md bg-[#161616]"
            placeholder="Search Pokemon"
            onChange={(e) => setPokeName(e.target.value)}
            onKeyUp={suggestList}
          />
          <button
            className="bg-slate-200 w-20 rounded-md px-3 text-black"
            onClick={(e) => handleQuery(e)}
          >
            Search
          </button>
        </form>
        {suggestions.length > 0 && (
          <div className="absolute bg-neutral-800 w-4/5 max-h-60 overflow-y-auto z-10">
            {suggestions.map((items: IPokeList, idx: number) => (
              <div
                className="p-2 border-b hover:bg-neutral-900 cursor-pointer"
                key={idx}
                onClick={() => {
                  setPokeName(items.name);
                  setSuggestions([]);
                }}
              >
                {items.name}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="mt-20 w-4/5 mx-auto p-4">
        <div className="flex flex-wrap gap-10 justify-evenly">
          {data.map((items: IPokeData, index) => (
            <Link to={`/pokemon/${items.name}`}>
              <PokeCard key={index} data={items} id={index + 1} />
            </Link>
          ))}
        </div>
        <div className="my-12 w-64 mx-auto py-4 flex justify-evenly align-middle">
          {prevPageUrl && (
            <div
              onClick={handlePrevPage}
              className="border py-2 px-4  rounded-md cursor-pointer"
            >
              Previous
            </div>
          )}
          {nextPageUrl && (
            <div
              onClick={handleNextPage}
              className="border rounded-md py-2 px-4 cursor-pointer"
            >
              Next
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
