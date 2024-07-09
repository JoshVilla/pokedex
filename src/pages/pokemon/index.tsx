import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { findPokemon, getPokemon } from "../../utils/api";
import { capitalize, getColor } from "../../utils/helpers";
import axios from "axios";
import style from "./style.module.scss";
import { IPokemonData, OtherDescription } from "./interface";
import Stats from "./components/stats";
import Evolution from "./components/evolution";

const Pokemon = () => {
  const { id } = useParams();
  const [data, setData] = useState<any>({});
  const [color, setColor] = useState("");
  const [pokeId, setPokeId] = useState(0);
  const [pokemonData, setPokemonData] = useState<IPokemonData>({
    height: 0,
    weight: 0,
    base_experience: 0,
  });
  const [pokeDescription, setPokeDescription] = useState("");
  const [otherDescription, setOtherDescription] = useState<OtherDescription>({
    baseHapp: 0,
    captureRate: 0,
  });
  const [pokeType, setPokeType] = useState("");
  const [dataStats, setDataStats] = useState([]);
  const mapDescription = () => {
    const { baseHapp, captureRate } = otherDescription;
    const { weight, height, base_experience } = pokemonData;

    return [
      {
        label: "Weight",
        value: `${weight || 0} kg`,
      },
      {
        label: "Height",
        value: `${height.toFixed(2) || 0} m`,
      },
      {
        label: "Base Experience",
        value: base_experience || 0,
      },
      {
        label: "Base Happiness",
        value: baseHapp,
      },
      {
        label: "Capture Rate",
        value: captureRate,
      },
    ];
  };
  useEffect(() => {
    getPokemon(id).then((res) => {
      console.log(res.data);
      setOtherDescription({
        ...otherDescription,
        baseHapp: res.data.base_happiness,
        captureRate: res.data.capture_rate,
      });
      setPokeDescription(res.data.flavor_text_entries[6].flavor_text);
      setData(res.data);
      setColor(res.data.color.name);
      setPokeId(res.data.id);
    });
  }, [id]);

  useEffect(() => {
    axios
      .get(
        `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokeId}.svg`
      )
      .then((response) => {
        document.getElementById(`pokemon-svg`).innerHTML = response.data;
      });

    findPokemon(pokeId.toString()).then((res) => {
      setPokemonData(res.data);
      setPokeType(res.data.types[0].type.name);
      setDataStats(res.data.stats);
    });
  }, [pokeId]);
  console.log(pokeId, "pokeId");

  return (
    <div className="w-2/4 mx-auto mt-20">
      <div className="w-full flex align-middle rounded-lg">
        <div className=" flex-1 text-center">
          <div className={`${style.pokeContainer}`} id="pokemon-svg" />
        </div>
        <div className=" flex-1 m-auto">
          <div className="text-xl font-bold">{`#${pokeId}`}</div>
          <div
            className={`text-6xl font-bold`}
            style={{ color: getColor(color) }}
          >
            {capitalize(data.name, "all")}
          </div>
          <div className="text-xl mt-3 font-bold">
            <span style={{ color: getColor(color) }}>
              {" "}
              {capitalize(`${pokeType}`, "all")}
            </span>
            <span> {capitalize(`Pokemon`, "all")}</span>
          </div>
        </div>
      </div>
      <div className="p-4 bg-neutral-900 rounded-lg my-6 text-center">
        {pokeDescription}
      </div>
      <div className="flex">
        <div className="flex-1 p-4">
          {mapDescription().map((items, idx: number) => (
            <div
              className="bg-neutral-900 py-2 px-4 mt-3 flex justify-between rounded-md "
              key={idx}
            >
              <span> {items.label}</span>
              <span className="font-bold" style={{ color: getColor(color) }}>
                {items.value}
              </span>
            </div>
          ))}
        </div>
        <div className="flex-1 p-4">
          <Stats color={color} data={dataStats} />
        </div>
      </div>
      <Evolution id={pokeId} />
    </div>
  );
};

export default Pokemon;
