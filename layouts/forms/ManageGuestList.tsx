import GuestList from "../forms/GuestList";
import { primaryColor, secondaryFont } from "../font/font";

interface Props {
  onClose?: () => void;
  onChange?: (guests: any) => void;
}

const ManageGuestList = ({ onClose, onChange }: Props) => {
  const handleChange = (data) => {
    if (typeof onChange === "function") onChange(data);
  };
  return (
    <div className="pb-10">
      <div className="flex items-center justify-between py-4 border-b border-gray-200 mb-10">
        <h3
          className={`font-bold text-xl ${secondaryFont.className} text-[${primaryColor}] `}>
          Manage Guest List
        </h3>
        <p
          className="text-sm text-gray-700 cursor-pointer underline"
          onClick={onClose}>
          Go back
        </p>
      </div>
      <GuestList onChange={handleChange} />
    </div>
  );
};

export default ManageGuestList;
