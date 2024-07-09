import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { capitalize, getColor } from "../../../../utils/helpers";

type Stat = {
  name: string;
  url: string;
};
type Data = {
  base_stat: string;
  effort: number;
  stat: Stat;
};
type Props = {
  color: string;
  data: Data[];
};

const Stats = ({ color, data }: Props) => {
  return (
    <div className="p-1">
      {data.map((items, idx: number) => (
        <div
          key={idx}
          className="flex gap-5 align-middle justify-between text-lg mb-3 border-b pb-1 px-2"
        >
          <span style={{ color: getColor(color) }} className="font-bold">
            {capitalize(items.stat.name, "first")}
          </span>
          <span className="text-gray-300">{items.base_stat}</span>
        </div>
      ))}
    </div>
  );
};

export default Stats;
