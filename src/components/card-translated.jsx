/* eslint-disable react/prop-types */
import BoxText from "./box-text";
import Chip from "./chip";
import soundsvg from "../assets/img/sound_max_fill.svg";
import copysvg from "../assets/img/Copy.svg";
import changesvg from "../assets/img/Horizontal_top_left_main.svg";
import circlesvg from "../assets/img/circles.svg";

import { useState } from "react";
import CustomSelect from "./custom-select";

const CardTranslated = ({
  translated,
  onChangeLanguage,
  objlanguage,
  text,
  onChangeText,
  onTranslate,
  isLoading,
}) => {
  const [select, setSelect] = useState({
    code: "fr",
    language: "French",
  });

  const [activeVoz, setActiveVoz] = useState(false);
  const [activeCopy, setActiveCopy] = useState(false);

  const copyText = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setActiveCopy(true);

        setTimeout(() => {
          setActiveCopy(false);
        }, 1000);
      })
      .catch((err) => {
        console.error("Error al copiar el texto", err);
      });
  };

  const soundText = () => {
    if ("speechSynthesis" in window) {
      const synthesis = window.speechSynthesis;
      const voz = new SpeechSynthesisUtterance(text);
      voz.lang = objlanguage.code;
      synthesis.speak(voz);
      setActiveVoz(true);

      const interval = setInterval(() => {
        if (!synthesis.speaking) {
          clearInterval(interval);
          setActiveVoz(false);
        }
      }, 1000);
    } else {
      alert("La API de texto a voz no es compatible con este navegador.");
    }
  };
  return (
    <div className="relative bg-[#212936f5] border-[1px] border-[#4D5562] p-3 md:p-4 rounded-xl md:max-w-[500px] w-full flex flex-col justify-between">
      {isLoading && (
        <div className=" z-30 absolute top-0 bottom-0 right-0 left-0 flex justify-center items-center bg-[#12121259]">
          <img src={circlesvg} alt="a" className="w-5 h-5" />
        </div>
      )}
      <header className="w-full pb-2  md:pb-3 border-b-[1px] border-b-[#4D5562]">
        <div className=" flex justify-between items-center">
          <div className=" flex  ">
            <Chip
              text="Spanish"
              active={objlanguage.language === "Spanish"}
              onClick={() =>
                onChangeLanguage({
                  code: "es",
                  language: "Spanish",
                })
              }
              key="Spanish"
            />
            <Chip
              text="English"
              active={objlanguage.language === "English"}
              key="English"
              onClick={() =>
                onChangeLanguage({
                  code: "en",
                  language: "English",
                })
              }
            />
            <Chip
              text={select.language}
              active={objlanguage.language === select.language}
              key={select.language}
              onClick={() => onChangeLanguage(select)}
            />

            <CustomSelect
              onSelect={(i) => {
                setSelect(i);
                onChangeLanguage(i);
              }}
            />
          </div>

          {!translated && (
            <button className=" border-[1px] border-[#394150] p-1 rounded-md cursor-pointer">
              <img src={changesvg} alt="" className=" w-full h-full" />
            </button>
          )}
        </div>
      </header>

      <BoxText
        isTranslated={translated}
        onChangeText={onChangeText}
        text={text}
      />

      <div className=" w-full flex justify-between items-center mt-2 md:mt-3">
        <div className=" flex gap-2">
          <button
            onClick={soundText}
            className={`border-[1px] ${
              activeVoz
                ? " border-green-600 text-green-600"
                : "border-[#394150]"
            } p-1 rounded-md cursor-pointer h-fit hover:bg-slate-700`}
          >
            <img
              src={soundsvg}
              alt=""
              className="text-green-600 w-full h-full"
            />
          </button>
          <button
            onClick={copyText}
            className={`border-[1px] ${
              activeCopy
                ? " border-green-600 text-green-600"
                : "border-[#394150]"
            } p-1 rounded-md cursor-pointer h-fit hover:bg-slate-700`}
          >
            <img src={copysvg} alt="" className=" w-full h-full" />
          </button>
        </div>

        {translated && (
          <button
            onClick={onTranslate}
            className=" bg-[#3662E3] px-3 py-2 rounded-md text-sm font-semibold"
          >
            Translate
          </button>
        )}
      </div>
    </div>
  );
};

export default CardTranslated;
