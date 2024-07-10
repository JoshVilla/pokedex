import React, { useEffect, useMemo, useState } from "react";
import Logo from "/mainLogo.png";
import LoadingLogo from "/pokeball.png";
import { getAllPokemon } from "../../utils/api";
import { getPokeId } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";

interface IPokeData {
  name: string;
  url: string;
}
const SplashScreen = () => {
  const navigate = useNavigate();
  const [pokeData, setPokeData] = useState<any>([]);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const getAllPokemons = useMemo(() => {
    return pokeData.map((items: IPokeData) => {
      return {
        name: items.name,
        id: getPokeId(items.url),
      };
    });
  }, [pokeData]);

  useEffect(() => {
    getAllPokemon().then((res) => {
      setPokeData(res.data.results);
      setTimeLeft(5);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("pokemons", JSON.stringify(getAllPokemons));
  }, [pokeData]);

  useEffect(() => {
    const timer = setInterval(() => {
      timeLeft > 0 && setTimeLeft((prev) => prev - 1);

      if (timeLeft === 0) navigate("/home");
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <div className="w-full h-[100vh] flex items-center justify-center text-center">
      <div>
        <img src={Logo} alt="pokelogo" />
        <div className="mt-4">
          <img
            src={LoadingLogo}
            alt="pokeball"
            width={60}
            className="animate-spin m-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
