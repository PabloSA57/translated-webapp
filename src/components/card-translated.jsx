/* eslint-disable react/prop-types */
import BoxText from "./box-text";
import Chip from "./chip";
import soundsvg from "../assets/img/sound_max_fill.svg";
import copysvg from "../assets/img/Copy.svg";
import changesvg from "../assets/img/Horizontal_top_left_main.svg";

import { useState } from "react";
import CustomSelect from "./custom-select";

const CardTranslated = ({
  translated,
  onChangeLanguage,
  objlanguage,
  text,
  onChangeText,
  onTranslate,
}) => {
  const [select, setSelect] = useState({
    code: "fr",
    language: "French",
  });

  const copyText = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Texto copiado con éxito");
      })
      .catch((err) => {
        console.error("Error al copiar el texto", err);
      });
  };

  const soundText = () => {
    // Verificar si la API de texto a voz es compatible con el navegador
    if ("speechSynthesis" in window) {
      // Crear un objeto de síntesis de voz
      const synthesis = window.speechSynthesis;

      // Crear un objeto de voz con el texto proporcionado
      const voz = new SpeechSynthesisUtterance(text);
      voz.lang = objlanguage.code;
      // Reproducir la voz
      synthesis.speak(voz);
    } else {
      // Manejar el caso en el que la API no sea compatible
      alert("La API de texto a voz no es compatible con este navegador.");
    }
  };
  return (
    <div className=" bg-[#212936cc] border-[1px] border-[#4D5562] p-3 md:p-4 rounded-xl md:max-w-[500px] w-full flex flex-col justify-between">
      <header className="w-full py-2 md:p-3 border-b-[1px] border-b-[#4D5562]">
        <div className=" flex justify-between items-center">
          <div className=" flex  ">
            {translated && (
              <Chip text="Detectar idioma" active={false} key={"DI"} />
            )}
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
            className=" border-[1px] border-[#394150] p-1 rounded-md cursor-pointer h-fit"
          >
            <img src={soundsvg} alt="" className=" w-full h-full" />
          </button>
          <button
            onClick={copyText}
            className=" border-[1px] border-[#394150] p-1 rounded-md cursor-pointer h-fit"
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
