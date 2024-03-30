import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { PlaneIcon } from "@components/commons/icons";
import { Poppins, Source_Serif_4 } from "next/font/google";
import Link from "next/link";
import AddedTrip from "./added-trip";
import Button from "@components/commons/button";
import { Modal } from "antd";
import { useCookies } from "react-cookie";
import { StyledDivider } from "@components/commons/common";
import { Added_Trips } from "@constants/added_trips";
import { useTripsContext } from "@providers/trips";
import { getTrips } from "@app/modules/trips/actions";

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
  color: #23432c;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const PopupAddTrips = ({ type }) => {
  const { tripStore, tripDispatch } = useTripsContext();
  const [cookie] = useCookies([Added_Trips]);
  
  useEffect(() => {
    getTrips(tripDispatch, cookie[Added_Trips] ?? []);
  }, []);

  const bookingData = tripStore.trips.reverse();
  const currentBooking = bookingData.shift();

  return (
    <Modal open closable={false} footer={false}>
      <Container className={font.className}>
        <div className="flex flex-col justify-center gap-1">
          <div className="w-fit mx-auto">
            <PlaneIcon />
          </div>
          <p className="w-fit text-xl">
            Successfully Added to Trips!
          </p>
          <Link
            className={`${secondaryFont.className} underline text-center`}
            href={`/${type}`}>
            Continue booking
          </Link>
        </div>

        <div className="h-48 overflow-auto ">
          {
            currentBooking &&
            <AddedTrip
              content={currentBooking}
            />
          }
          <StyledDivider />
          {bookingData
            .map((d, i) => {
              return <AddedTrip key={i} content={d} />;
            })}
        </div>

        <div className="flex justify-center gap-3">
          <Link href="/trips">
            <Button className="underline h-10 text-lg" type="link">
              Go To Trips
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
