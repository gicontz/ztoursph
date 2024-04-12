import Guest from "@components/checkout/guest";
import { primaryColor, secondaryFont } from "../font/font";

interface Props {
  onChange?: (guests: any) => void;
}

const GuestList = ({ onChange }: Props) => {
  const handleGuests = (guests) => {
    if (localStorage.getItem("guests") !== null)
      localStorage.removeItem("guests");
    localStorage.setItem("guests", JSON.stringify(guests));
    if (typeof onChange === "function") onChange(guests ?? []);
  };

  return (
    <div>
      <p
        className={`text-lg font-bold mb-2 ${secondaryFont.className} text-[${primaryColor}]`}>
        Guest/s Name Information
      </p>

      <Guest onChange={handleGuests} />
    </div>
  );
};

export default GuestList;
