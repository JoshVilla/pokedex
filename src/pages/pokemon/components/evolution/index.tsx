import React, { useEffect, useState } from "react";
import { getEvolution } from "../../../../utils/api";
import axios from "axios";
import { capitalize, getPokeId } from "../../../../utils/helpers";

type Props = {
  id: number;
};

type EvolveProps = {
  name: string;
  id: string | null;
};

const Evolution = ({ id = 1 }: Props) => {
  const [firstEvolve, setFirstEvolve] = useState<EvolveProps>({
    id: "",
    name: "",
  });
  const [secondEvolve, setsecondEvolve] = useState<EvolveProps>({
    id: "",
    name: "",
  });
  const [thirdEvolve, setThirdEvolve] = useState<EvolveProps>({
    id: "",
    name: "",
  });
  useEffect(() => {
    getEvolution(id).then((res: any) => {
      console.log(
        getPokeId(res.data.chain.evolves_to[0].evolves_to[0].species.url),
        "third"
      );
      setFirstEvolve({
        name: res.data.chain.species.name,
        id: id.toString(),
      });
      setsecondEvolve({
        name: res.data.chain.evolves_to[0].species.name,
        id: getPokeId(res.data.chain.evolves_to[0].species.url),
      });
      setThirdEvolve({
        name: res.data.chain.evolves_to[0].evolves_to[0].species.name,
        id: getPokeId(res.data.chain.evolves_to[0].evolves_to[0].species.url),
      });
    });
  }, [id]);

  useEffect(() => {
    pokeImage(id, "current-evolve");
    pokeImage(secondEvolve.id, "second-evolve");
    pokeImage(thirdEvolve.id, "third-evolve");
  }, [firstEvolve, secondEvolve, thirdEvolve]);

  const pokeImage = async (id: number | string | null, elementId: string) => {
    axios
      .get(
        `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${id}.svg`
      )
      .then((response) => {
        document.getElementById(elementId).innerHTML = response.data;
      });
  };
  return (
    <div className="bg-neutral-900 rounded-md p-3">
      <div className="text-3xl font-bold text-center mt-5">Evolution</div>
      <div className="flex justify-around align-middle mt-12">
        <div className="text-center">
          <div id="current-evolve" className="mb-4" />
          <span className="text-lg">
            {capitalize(firstEvolve.name, "first")}
          </span>
        </div>
        <div className="text-center">
          <div id="second-evolve" className="mb-4" />
          <span className="text-lg">
            {capitalize(secondEvolve.name, "first")}
          </span>
        </div>
        <div className="text-center">
          <div id="third-evolve" className="mb-4" />
          <span className="text-lg">
            {capitalize(thirdEvolve.name, "first")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Evolution;
