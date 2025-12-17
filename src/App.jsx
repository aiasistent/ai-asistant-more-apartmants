import { BrowserRouter, Routes, Route } from "react-router-dom";
import SelectApartment from "./pages/SelectApartment";
import ApartmentChat from "./pages/ApartmentChat";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SelectApartment />} />
        <Route path="/apartment/:id" element={<ApartmentChat />} />
      </Routes>
    </BrowserRouter>
  );
}
