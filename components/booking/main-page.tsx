import React, { FormEvent, useRef } from "react";
import { Space } from "antd";
import styled from "@emotion/styled";

import Button from "@components/commons/button";
import { MapIcon, TravellersIcons } from "@components/commons/custom-icon";
import Datepicker from "@components/commons/date-picker";
import Dropdown from "@components/commons/dropdown";

const ContainerCard = styled(Space)`
  display: flex;
  padding: 10px;
  box-shadow: 0px 0px 5px black;
  border-radius: 0.2rem;
`;

const MainPageBooking = () => {
  const destination = useRef<string | undefined>();
  const checkInOut = useRef<{ checkIn?: Date; checkOut?: Date }>({});
  const headCount = useRef<number>(0);

  const optionDest = [
    { value: "Tour A", label: "El Nido Island Tour A" },
    { value: "Tour B", label: "El Nido Island Tour B" },
    { value: "Tour C", label: "El Nido Island Tour C" },
  ];

  const optionTravellers = Array.from({ length: 5 }, (_, index) => ({
    label: index + 1,
    value: index + 1,
  }));

  const submitBook = (e: FormEvent) => {
    e.preventDefault();
    console.log("Destination:", destination.current);
    console.log("Check-In/Out:", checkInOut.current);
    console.log("Head Count:", headCount.current);
  };

  return (
    <form onSubmit={submitBook}>
      <ContainerCard>
        <Dropdown
          prefixIcon={<MapIcon boxSize={5} />}
          placeholder="I want to go"
          onChange={(e) => (destination.current = e)}
          option={optionDest}
        />
        <Datepicker
          onChange={(e) => {
            const firstDate = e?.[0] as any;
            const secondDate = e?.[1] as any;

            return (checkInOut.current = {
              checkIn: firstDate?.$d,
              checkOut: secondDate?.$d,
            });
          }}
        />
        <Dropdown
          isNumber
          prefixIcon={<TravellersIcons boxSize={5} />}
          placeholder="Travellers"
          onChange={(e) => (headCount.current = e)}
          option={optionTravellers}
        />
        <Button type="primary" htmlType="submit">
          Book
        </Button>
      </ContainerCard>
    </form>
  );
};

export default MainPageBooking;
