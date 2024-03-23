import React from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import { Source_Serif_4 } from "next/font/google";
import { blurImageData } from "@constants/image";
import { TTrip } from "@app/modules/trips/types";

const secondaryFont = Source_Serif_4({
  weight: "700",
  subsets: ["latin"],
});

const Container = styled.div`
  * {
    // border: blue 1px solid;
  }

  display: flex;
  gap: 0.5rem;
  margin: 1rem;
  color: #23432c;

  img {
    width: 10rem;
    height: 7rem;
    object-fit: cover;
    border-radius: 3px;
  }
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.8rem;
  height: fit-content;
  justify-content: end;

  p {
    width: fit-content;
    font-size: 0.7rem;
  }

  .label {
    font-style: 500;
  }
`;

type AddedTripProps = {
  content: TTrip;
};

const AddedTrip: React.FC<AddedTripProps> = ({ content }) => {
  const date = new Date(content.date);
  return (
    <Container>
      <Image
        src={content.thumbnail}
        alt={content.title}
        width={1000}
        height={250}
        blurDataURL={blurImageData}
      />

      <div className="flex flex-col justify-between">
        <p className={`text-xl ${secondaryFont.className}`}>
          {content.title}
        </p>
        <div>
          <p
            className={`label ${secondaryFont.className} px-1 w-fit bg-[#23432c] text-white`}>
            {content.category} Details
          </p>
          <div className="flex gap-2 justify-between">
            <Detail>
              <p className={`label ${secondaryFont.className}`}>Tour Date</p>
              <p>
                {/* {new Intl.DateTimeFormat("en-US", {
                  dateStyle: "short",
                }).format(date)} */}
                {date.toDateString()}
              </p>
            </Detail>
            <Detail>
              <p className={`label ${secondaryFont.className}`}>
                Pick Up Location
              </p>
              <p>{content.location}</p>
            </Detail>
            <Detail>
              <p className={`label ${secondaryFont.className}`}>Pax</p>
              <p>{content.participants.length}</p>
            </Detail>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AddedTrip;
