import { pokeColor } from "./constant/pokeColor";

export const capitalize = (name: string = "", option: "first" | "all") => {
  if (option === "first") return name.charAt(0).toUpperCase() + name.slice(1);
  if (option === "all") return name.toUpperCase();
};

export const getPokeId = (url: string) => {
  const match = url.match(/\/(\d+)\//);
  const number = match ? match[1] : null;
  return number;
};

export const getPokemonImageUrl = (id: number | string = "") => {
  return id
    ? `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${id}.svg`
    : "";
};

export const getColor = (name: string) => {
  const colorEntry = pokeColor.find((el) => el.label === name);
  return colorEntry?.lightColor || "transparent";
};
