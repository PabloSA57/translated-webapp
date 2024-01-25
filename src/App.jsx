import { useState } from "react";
import CardTranslated from "./components/card-translated";

function App() {
  const [from, setFrom] = useState({
    code: "es",
    language: "Spanish",
  });
  const [to, setTo] = useState({
    code: "en",
    language: "English",
  });

  const [text, setText] = useState("Hola mundo");

  const [textResponse, setTextResponse] = useState("");
  // console.log("iso", iso.filter((i) => i.language === "French")[0]);

  const handleTranslate = () => {
    console.log("text", text);
    console.log("to", to);
    console.log("from", from);
    fetch(
      `https://api.mymemory.translated.net/get?q=${text}!&langpair=${from.code}|${to.code}`
    )
      .then((res) => res.json())
      .then(({ responseData }) => setTextResponse(responseData.translatedText))
      .catch((error) => console.log("error", error));
  };
  return (
    <div className="mx-2 h-screen flex flex-col justify-center">
      <h1 className=" text-gray-100 text-md font-semibold text-center mb-5 md:mb-10">
        translated
      </h1>

      <section className="flex flex-col gap-4 w-full md:flex-row md:justify-center">
        <CardTranslated
          translated={true}
          onTranslate={handleTranslate}
          onChangeText={(text) => setText(text)}
          text={text}
          objlanguage={from}
          onChangeLanguage={(text) =>
            to.language !== text.language && setFrom(text)
          }
          key="from"
        />
        <CardTranslated
          translated={false}
          text={textResponse}
          objlanguage={to}
          onChangeLanguage={(text) => setTo(text)}
          key="to"
        />
      </section>
    </div>
  );
}

export default App;
