import axios from "axios";
import React, { useEffect, useState } from "react";
import { capitalize } from "../../utils/helpers";
import "./style.module.scss";
import Pokeball from "/pokeball.png";
type Props = {
  data: any;
  id: number;
};

const PokeCard = ({ data, id }: Props) => {
  const [pokeId, setPokeId] = useState(0);
  const getIdFromUrl = () => {
    const url = data.url;
    const match = url.match(/\/(\d+)\//);
    const number = match ? match[1] : null;
    setPokeId(number);
  };

  useEffect(() => {
    getIdFromUrl();
  }, [data]);

  useEffect(() => {
    document.getElementById(`pokemon-svg-${id}`).style.display = "none";
    document.getElementById(`afterLoaded-${id}`).style.display = "none";
    document.getElementById(`duringLoading-${id}`).style.display = "block";
    axios
      .get(
        `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokeId}.svg`
      )
      .then((response) => {
        document.getElementById(`pokemon-svg-${id}`).style.display = "block";
        document.getElementById(`pokemon-svg-${id}`).innerHTML = response.data;
        document.getElementById(`afterLoaded-${id}`).style.display = "block";
        document.getElementById(`duringLoading-${id}`).style.display = "none";
      })
      .catch((error) => {
        console.clear();
      });
  }, [pokeId]);

  return (
    <div className="relative hover:scale-105 ">
      <div className="w-60 h-30 rounded-md bg-[#161616] overflow-hidden">
        <div className="relative h-24" id={`afterLoaded-${id}`}>
          <img
            src={Pokeball}
            alt=""
            id=""
            className="absolute right-[-40px] bottom-0 h-32 w-32 opacity-5"
          />
          <div className="absolute left-4 top-10 text-lg font-bold">
            {capitalize(data.name, "first")}
          </div>
        </div>
        <div className="relative h-24" id={`duringLoading-${id}`}>
          <img
            src={Pokeball}
            alt=""
            id=""
            className="absolute animate-spin right-[-40px] bottom-0 h-32 w-32 opacity-5"
          />
          <div className="absolute left-4 top-10 text-lg font-bold">
            Loading...
          </div>
        </div>
      </div>
      <div
        id={`pokemon-svg-${id}`}
        className="absolute object-fit h-20 w-24 bottom-0 right-2"
      />
    </div>
  );
};

export default PokeCard;
