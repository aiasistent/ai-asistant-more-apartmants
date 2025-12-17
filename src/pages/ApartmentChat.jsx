import { useParams } from "react-router-dom";
import { useState } from "react";
import { infoApartments } from "../data/infoApartments";
import Chat from "../components/Chat";
import LanguageSwitch from "../components/LanguageSwitch";

export default function ApartmentChat() {
  const { id } = useParams();
  const apartment = infoApartments.find((a) => a.id === id);

  const [lang, setLang] = useState("sr");

  if (!apartment) {
    return <div>Apartman nije pronađen</div>;
  }

  return (
    <div className="min-h-screen bg-black">
      <LanguageSwitch lang={lang} setLang={setLang} />
      <Chat apartment={apartment} lang={lang} />
    </div>
  );
}
