/* eslint-disable react/prop-types */
import { iso } from "../data/iso.json";
import expandvg from "../assets/img/Expand_down.svg";
import { useState } from "react";
const CustomSelect = ({ onSelect }) => {
  const [showExpand, setShowExpand] = useState(false);
  return (
    <div className="relative">
      <button
        className=" cursor-pointer "
        onClick={() => setShowExpand(!showExpand)}
      >
        <img src={expandvg} alt="" className=" w-full h-full" />
      </button>
      {showExpand && (
        <div className=" transition ease-in-out delay-150 duration-300 flex flex-col gap-1  absolute right-0 max-h-[180px] overflow-auto bg-[#212936] p-2 ">
          {iso.map((i) => (
            <span
              className="text-xs cursor-pointer"
              key={i.code}
              onClick={() => onSelect(i)}
            >
              {i.language}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
