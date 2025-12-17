import { infoApartments } from "../data/infoApartments";
import { useNavigate } from "react-router-dom";

export default function SelectApartment() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black flex flex-wrap justify-center gap-6 p-6">
      {infoApartments.map((apt) => (
        <div
          key={apt.id}
          onClick={() => navigate(`/apartment/${apt.id}`)}
          className="h-60 w-64 cursor-pointer bg-[#0D1B2A] rounded-2xl shadow-xl p-4 text-white hover:scale-105 transition flex flex-col"
        >
          <div className="w-full h-40 rounded-xl overflow-hidden mb-3">
            <img
              src={apt.img}
              alt={apt.name}
              className="w-full h-full object-cover"
            />
          </div>

          <h2 className="text-xl font-bold text-center">{apt.name}</h2>
        </div>
      ))}
    </div>
  );
}
