/* eslint-disable react/prop-types */
import { iso } from "../data/iso.json";
import expandvg from "../assets/img/Expand_down.svg";
import { useEffect, useRef, useState } from "react";
const CustomSelect = ({ onSelect }) => {
  const [showExpand, setShowExpand] = useState(false);

  const dropdown = useRef();
  const notification = useRef();

  const handleClickOutside = (e) => {
    const isClickInsideDropdown = dropdown.current?.contains(e.target);
    const isClicked = notification.current?.contains(e.target);
    if (!isClickInsideDropdown && !isClicked) {
      setShowExpand(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <button
        ref={notification}
        className=" cursor-pointer "
        onClick={() => setShowExpand(!showExpand)}
      >
        <img src={expandvg} alt="" className=" w-full h-full" />
      </button>
      {showExpand && (
        <div
          ref={dropdown}
          className=" transition ease-in-out delay-150 duration-300 flex flex-col gap-1  absolute right-0 top-[2rem] max-h-[180px] overflow-auto bg-[#212936] p-2 "
        >
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
