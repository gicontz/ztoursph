import React from "react";
import Image from "next/image";
import { blurImageData } from "@constants/image";
import { TrashIcon } from "@components/commons/icons";
import ConfirmationDialog from "@app/layouts/modals/ConfirmationDialog";
import { useDialog } from "@providers/dialog";
import { format } from "date-fns";

const PackageCard = ({
  image,
  title,
  date,
  pickup,
  pax = 1,
  price,
  subTotal,
  onRemove = () => {},
}) => {
  const [openDialog, closeDialog] = useDialog();

  const handleConfirm = () => {
    onRemove();
    closeDialog();
  }

  const handleRemove = () => {
    openDialog({
      children: <ConfirmationDialog
        title="Remove Trip"
        message="Are you sure you want to remove this trip?"
        onOk={handleConfirm}
        onCancel={closeDialog}
      />
    });
  }

  return (
    <div className="flex items-center text-center w-full [&>div]:w-1/4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-2">
        <Image
          src={image}
          alt={title}
          width={1000}
          height={250}
          className="!w-30 lg:!w-40"
          blurDataURL={blurImageData}
        />
        <div className="flex flex-col text-left">
          <h4 className="truncate max-w-[220px] text-lg mt-2" title={title}>{title}</h4>
          <div className="flex flex-col">
            <p className="text-lg font-bold">Tour Details</p>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col">
                <p className="font-bold text-sm">Tour Date</p>
                <em className="text-sm">{format(date, "MMM dd, yyyy")}</em>
              </div>

              <div className="flex flex-col">
                <p className="font-bold text-sm">Pick Up Location</p>
                <em className="text-sm">{pickup}</em>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p>₱{price}</p>
      </div>
      <div>
        <p>{pax}</p>
      </div>
      <div>
        <p className="mx-auto block space-x-5">
          <span>₱{subTotal}</span>
          <TrashIcon className="cursor-pointer text-red-700" onClick={handleRemove} />
        </p>
      </div>
    </div>
  );
};

export default PackageCard;
