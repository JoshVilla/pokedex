import axios from "axios";
import { post } from "./services";

export const getPokemons = async (
  url: string = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"
) => {
  return await axios({
    method: "get",
    url: url,
  });
};

export const findPokemon = async (name: string) => {
  const pokename = name.toLowerCase() || "";
  return await axios({
    method: "get",
    url: `https://pokeapi.co/api/v2/pokemon/${pokename}/`,
  });
};

export const getPokemon = async (value: string = "") => {
  return await axios({
    method: "get",
    url: `https://pokeapi.co/api/v2/pokemon-species/${value}`,
  });
};

export const getPokemonTypes = async (value: number = 1) => {
  return await axios({
    method: "get",
    url: `https://pokeapi.co/api/v2/type/${value}`,
  });
};

export const getPokemonColor = async (id: number = 1) => {
  return await axios({
    method: "get",
    url: `: https://pokeapi.co/api/v2/pokemon-color/${id}`,
  });
};

export const getPokeImage = async (id: number = 1) => {
  return await axios.get(
    `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${id}.svg`
  );
};

export const getEvolution = async (id: number = 1) => {
  return await axios({
    method: "get",
    url: `https://pokeapi.co/api/v2/evolution-chain/${id}/`,
  });
};

export const getAllPokemon = async () => {
  return await axios({
    method: "get",
    url: "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0",
  });
};
