import React from "react";
import { useForm } from "react-hook-form";
import RangePickerComponent from "@components/commons/range-picker";
import Dropdown from "@components/commons/dropdown";
import Button from "@components/commons/button";
import styled from "@emotion/styled";

import { MapIcon, TravellersIcon } from "@components/commons/icons";

const ContainerCard = styled.form`
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;

  display: flex;
  flex-direction: row;

  gap: 0.5rem;

  padding: 1.2rem 1.1rem;
  box-shadow: 0px 0px 5px black;
  border-radius: 0.2rem;
  z-index: 10;
`;

const MainPageBooking = () => {
  const { handleSubmit, control } = useForm();

  const optionDest = [
    { value: "Tour A", label: "El Nido Island Tour A" },
    { value: "Tour B", label: "El Nido Island Tour B" },
    { value: "Tour C", label: "El Nido Island Tour C" },
  ];

  const optionTravellers = Array.from({ length: 5 }, (_, index) => ({
    label: index + 1,
    value: index + 1,
  }));

  return (
    <ContainerCard onSubmit={handleSubmit((data) => console.log(data))}>
      <Dropdown
        showSearch
        prefixIcon={<MapIcon />}
        name="destination"
        control={control}
        rules={{ required: "Destination is needed." }}
        placeholder="I want to go"
        options={optionDest}
      />
      <RangePickerComponent
        name="check-in-out"
        control={control}
        rules={{ required: "date is needed." }}
      />
      <Dropdown
        showSearch
        isnumber
        prefixIcon={<TravellersIcon />}
        name="travellers"
        control={control}
        placeholder="Travellers"
        options={optionTravellers}
      />
      <Button type="primary" htmlType="submit">
        Book
      </Button>
    </ContainerCard>
  );
};

export default MainPageBooking;
