import React, { useEffect, useState } from "react";
import { findPokemon, getPokemons } from "../../utils/api";
import PokeCard from "../../components/pokeCard";
import { Link } from "react-router-dom";

const Home = () => {
  const [pokeName, setPokeName] = useState("");
  const [data, setData] = useState([]);
  const [prevPageUrl, setPrevPageUrl] = useState("");
  const [nextPageUrl, setNextPageUrl] = useState("");

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
  return (
    <div className="w-full">
      <form action="" className="w-1/4 my-10 mx-auto flex">
        <input
          type="text"
          className="w-full py-1 px-3 rounded-md bg-[#161616]"
          placeholder="Search Pokemon"
          onChange={(e) => setPokeName(e.target.value)}
        />
        <button
          className="bg-slate-200 w-20 rounded-md px-3 text-black"
          onClick={(e) => handleQuery(e)}
        >
          Search
        </button>
      </form>
      <div className="mt-20 w-4/5 mx-auto p-4">
        <div className="flex flex-wrap gap-10 justify-evenly">
          {data.map((items: any, index) => (
            <Link to={`/pokemon/${items.name}`}>
              <PokeCard key={index} data={items} id={index + 1} />
            </Link>
          ))}
        </div>
        <div className="my-12 w-64 mx-auto py-4 flex justify-evenly align-middle">
          {prevPageUrl && (
            <div
              onClick={handlePrevPage}
              className="border py-2 px-4  rounded-md"
            >
              Previous
            </div>
          )}
          {nextPageUrl && (
            <div
              onClick={handleNextPage}
              className="border rounded-md py-2 px-4"
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
