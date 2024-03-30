import styled from "@emotion/styled";
import React, { useState } from "react";
import Image from "next/image";
import IncreaseCount from "./increaseCount";
import { blurImageData } from "@constants/image";
import { TrashIcon } from "@components/commons/icons";
import ConfirmationDialog from "@app/layouts/modals/ConfirmationDialog";
import { useDialog } from "@providers/dialog";

const Rows = styled.div`
  display: flex;
  text-align: center;
  justify-content: space-between;
  padding: 0.5rem;
  > * {
    width: 25%;
  }

  .details {
    grid-column: span 2;
  }
`;

const CardDetail = styled.div`
  h2 {
    font-size: 1.3rem;
  }

  img {
    width: 10rem;
    height: 7rem;
    object-fit: cover;
    border-radius: 3px;
  }

  .package {
    padding: 0 10px;
    text-align: left;
    gap: 0.5rem;
  }
  .tour {
    font-size: 0.9rem;
  }
  . {
  }
  .header,
  .content {
    color: #787878;
    font-size: 0.9rem;
    line-height: 1.25rem;
    white-space: nowrap;
  }

  .content {
    font-size: 0.875rem;
    font-weight: 300;
  }
`;

const PackageCard = ({
  image,
  title,
  date,
  pickup,
  pax = 1,
  price,
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
    <Rows>
      <CardDetail className="details flex flex-col lg:flex-row items-baseline lg:items-center lg:space-x-2">
        <Image
          src={image}
          alt={title}
          width={1000}
          height={250}
          className="!w-30 !lg:w-40"
          blurDataURL={blurImageData}
        />
        <div className="flex flex-col justify-between text-left">
          <h4 className="truncate max-w-[220px] text-md mt-2" title={title}>{title}</h4>
          <div className="flex flex-col">
            <h2 className="tour">Tour Details</h2>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col">
                <p className="header">Tour Date</p>
                <p className="content">{date}</p>
              </div>

              <div className="flex flex-col">
                <p className="header">Pick Up Location</p>
                <p className="content">{pickup}</p>
              </div>
            </div>
          </div>
        </div>
      </CardDetail>
      <h4>₱{price}</h4>
      {/* <div className="flex justify-center">
        <IncreaseCount number={pax} onChange={handleCount} />
      </div> */}
      <h4>{pax}</h4>
      <h4 className="w-full">₱{pax * price}</h4>
      <TrashIcon className="cursor-pointer text-red-700" onClick={handleRemove} />
    </Rows>
  );
};

export default PackageCard;
