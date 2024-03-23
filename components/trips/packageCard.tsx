import styled from "@emotion/styled";
import React, { useState } from "react";
import Image from "next/image";
import IncreaseCount from "./increaseCount";
import { blurImageData } from "@constants/image";

const Rows = styled.div`
  display: grid;
  text-align: center;
  grid-template-columns: repeat(5, 1fr);
  padding: 0.5rem;

  .details {
    grid-column: span 2;
  }
`;

const CardDetail = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;

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
  onUpdatePrice,
}) => {
  const [count, setCount] = useState(pax);

  const handleCount = (newCount) => {
    setCount(newCount);
    onUpdatePrice(newCount);
  };

  return (
    <Rows>
      <CardDetail className="details">
        <Image
          src={image}
          alt={title}
          width={1000}
          height={250}
          blurDataURL={blurImageData}
        />
        <div className="flex flex-col justify-between package">
          <h2 className="truncate max-w-[220px]" title={title}>{title}</h2>
          <div>
            <h2 className="tour">Tour Details</h2>
            <div className="flex gap-3">
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
      <h2>₱{price}</h2>
      <div className="flex justify-center">
        <IncreaseCount number={pax} onChange={handleCount} />
      </div>
      <h2>₱{count * price}</h2>
    </Rows>
  );
};

export default PackageCard;
