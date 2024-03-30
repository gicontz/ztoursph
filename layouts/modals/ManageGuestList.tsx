import { CloseIcon } from "@chakra-ui/icons";
import GuestList from "../forms/GuestList"

interface Props {
    onClose?: () => void;
    onChange?: (guests: any) => void;
}

const ManageGuestList = ({ onClose, onChange }: Props) => {
    const handleChange = (data) => {
        if (typeof onChange === 'function') onChange(data);
    }
    return (
        <div className="p-5 pb-10 shadow rounded-md min-w-[390px]">
            <div className="flex items-center justify-between py-4 border-b border-gray-200 mb-10">
                <h3 className="font-bold text-xl">Manage Guest List</h3>
                <CloseIcon className="w-4 h-4 text-gray-700 cursor-pointer" onClick={onClose}/>
            </div>
            <GuestList onChange={handleChange}/>
        </div>
    );
};

export default ManageGuestList;
