import { BrowserRouter, Routes, Route } from "react-router-dom";
import SelectApartment from "./pages/SelectApartment";
import ApartmentChat from "./pages/ApartmentChat";

export default function App() {
  return (
    <div className="min-h-screen bg-black">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SelectApartment />} />
          <Route path="/apartment/:id" element={<ApartmentChat />} />
        </Routes>
      </BrowserRouter>

      <div className="mt-6 pb-2 text-center text-sm text-gray-300">
        Powered by{" "}
        <a
          href="https://www.instagram.com/aiapartman/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-blue-300 hover:text-blue-400 transition"
        >
          AI Apartman
        </a>
      </div>
    </div>
  );
}
