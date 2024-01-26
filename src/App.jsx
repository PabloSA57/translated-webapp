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

  const [status, setStatus] = useState("typing");
  // console.log("iso", iso.filter((i) => i.language === "French")[0]);

  const handleTranslate = () => {
    setStatus("loading");

    fetch(
      `https://api.mymemory.translated.net/get?q=${text}!&langpair=${from.code}|${to.code}&mt=1`
    )
      .then((res) => res.json())
      .then(({ responseData }) => {
        setTextResponse(responseData.translatedText);
        setStatus("success");
      })
      .catch((error) => setStatus("error"));
  };
  return (
    <div className="mx-2 h-screen flex flex-col justify-center">
      <h1 className=" text-gray-100 md:text-gray-900 text-md font-semibold text-center mb-5 md:mb-10">
        Nova Translated
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
          isLoading={status === "loading"}
        />
        <CardTranslated
          translated={false}
          text={textResponse}
          objlanguage={to}
          onChangeLanguage={(text) => setTo(text)}
          key="to"
          isLoading={status === "loading"}
        />
      </section>
    </div>
  );
}

export default App;
