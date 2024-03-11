import React from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import { Poppins, Source_Serif_4 } from "next/font/google";
import { blurImageData } from "@constants/image";

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

const AddedTrip = () => {
  return (
    <Container>
      <Image
        src={
          "data:image/jpeg;base64,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"
        }
        alt={"unknonw"}
        width={1000}
        height={250}
        blurDataURL={blurImageData}
      />

      <div className="justify-between ">
        <p className={`text-xl ${secondaryFont.className}`}>
          El Nido Island Tour A
        </p>
        <div>
          <p className={`label ${secondaryFont.className}`}>Tour Details</p>
          <div className="flex gap-2 justify-between">
            <Detail>
              <p className={`label ${secondaryFont.className}`}>Tour Date</p>
              <p>{`01/31/2024`}</p>
            </Detail>
            <Detail>
              <p className={`label ${secondaryFont.className}`}>
                Pick Up Location
              </p>
              <p>{`To be Decided`}</p>
            </Detail>
            <Detail>
              <p className={`label ${secondaryFont.className}`}>Pax</p>
              <p>{`6`}</p>
            </Detail>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AddedTrip;
