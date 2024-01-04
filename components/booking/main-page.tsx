import React from "react";
import { useForm } from "react-hook-form";
import RangePickerComponent from "@components/commons/range-picker";
import Dropdown from "@components/commons/dropdown";
import Button from "@components/commons/button";
import { Space } from "antd";
import styled from "@emotion/styled";



import { MapIcon, TravellersIcon } from "@components/commons/icons";

const ContainerCard = styled(Space)`
  display: flex;
  padding: 25px 20px;
  box-shadow: 0px 0px 5px black;
  border-radius: 0.2rem;
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
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <ContainerCard>
        <Dropdown
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
    </form>
  );
};

export default MainPageBooking;
