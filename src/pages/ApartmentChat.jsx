import { useParams } from "react-router-dom";
import { infoApartments } from "../data/infoApartments";
import Chat from "../components/Chat";

export default function ApartmentChat() {
  const { id } = useParams();
  const apartment = infoApartments.find((a) => a.id === id);

  if (!apartment) {
    return <div>Apartment not found.</div>;
  }

  return (
    <div>
      <Chat apartment={apartment} />
    </div>
  );
}
