import React from "react";
import styled from "@emotion/styled";
import { PlaneIcon } from "@components/commons/icons";
import { Poppins, Source_Serif_4 } from "next/font/google";
import Link from "next/link";
import AddedTrip from "./added-trip";
import Button from "@components/commons/button";
import { Modal } from "antd";
import { useCookies } from "react-cookie";

const font = Poppins({
  weight: "400",
  subsets: ["latin"],
});

const secondaryFont = Source_Serif_4({
  weight: "400",
  subsets: ["latin"],
});

const Container = styled.div`
  * {
    // border: blue solid 1px;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const PopupAddTrips = ({ type }) => {
  const [booking] = useCookies([type]);
  console.log(booking);
  return (
    <Modal open={true} closable={false} footer={false}>
      <Container className={font.className}>
        <div className="flex flex-col justify-center gap-1">
          <div className="w-fit mx-auto">
            <PlaneIcon />
          </div>
          <p className="w-fit">Successfully Added to Trips!</p>
          <Link
            className={`${secondaryFont.className} underline text-center`}
            href={`/${type}`}>
            Continue booking
          </Link>
        </div>

        <div className="h-48 overflow-auto ">
          <AddedTrip />
          <AddedTrip />
          <AddedTrip />
          <AddedTrip />
        </div>

        <div className="flex justify-center gap-3">
          <Link href="/trips">
            <Button className="underline h-10 text-lg" type="link">
              Go To {type.charAt(0).toUpperCase() + type.slice(1)}
            </Button>
          </Link>
          <Button className="underline h-10 text-lg" type="primary">
            Checkout
          </Button>
        </div>
      </Container>
    </Modal>
  );
};

export default PopupAddTrips;
