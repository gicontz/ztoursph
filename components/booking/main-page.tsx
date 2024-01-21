import React from "react";
import { useForm } from "react-hook-form";
import RangePickerComponent from "@components/commons/range-picker";
import Dropdown from "@components/commons/dropdown";
import Button from "@components/commons/button";
import styled from "@emotion/styled";

import { MapIcon, TravellersIcon } from "@components/commons/icons";
import TourA from "@assets/images/tour_a.jpg";
import TourB from "@assets/images/tour_b.jpg";
import TourC from "@assets/images/tour_c.jpg";
import SearchDestinationDropdown from "@components/commons/dropdown-showcase";
import AutoComplete from "@components/commons/autocomplete";

const SubmitButton = styled(Button)`
  padding: 0 1.6rem;
  font-weight: bold;
  height: 3.5rem;
`;

const ContainerCard = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  justify-content: center;
  flex-warp: nowarp;

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  gap: 0.5rem;

  padding: 1.2rem 1.1rem;
  box-shadow: 0px 0px 5px black;
  border-radius: 0.2rem;

  @media (max-width: 800px) {
    flex-wrap: wrap;
  }
`;

const MainPageBooking = () => {
  const { handleSubmit, control } = useForm();

  const optionDest = [
    {
      title: "El Nido Island Tour A",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec accumsan eros in volutpat sollicitudin. ",
      value: "Tour A",
      image: TourA,
    },
    {
      title: "El Nido Island Tour B",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec accumsan eros in volutpat sollicitudin.  ",
      value: "Tour B",
      image: TourB,
    },
    {
      title: "El Nido Island Tour C",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec accumsan eros in volutpat sollicitudin.  ",
      value: "Tour C",
      image: TourC,
    },
  ];

  const optionTravellers = Array.from({ length: 5 }, (_, index) => ({
    label: index + 1,
    value: index + 1,
  }));

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <ContainerCard>
        <SearchDestinationDropdown
          data={optionDest}
          control={control}
          placeholder="I want to go "
          prefixIcon={<MapIcon />}
        />
        <RangePickerComponent
          name="check-in-out"
          control={control}
          rules={{ required: "Date is needed." }}
        />

        <AutoComplete
          style={{ width: 200 }}
          options={optionTravellers}
          placeholder="Travellers"
          control={control}
          name="travellers"
          prefixIcon={<TravellersIcon />}
          filterOption={(inputValue, option) =>
            typeof inputValue === "number" && option?.label === inputValue
          }
        />
        <SubmitButton type="primary" htmlType="submit">
          Book
        </SubmitButton>
      </ContainerCard>
    </form>
  );
};

export default MainPageBooking;
