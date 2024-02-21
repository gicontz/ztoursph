import React from "react";
import { Controller, useForm } from "react-hook-form";

import RangePickerComponent from "@components/commons/range-picker";
import Button from "@components/commons/button";
import AutoComplete from "@components/commons/autocomplete";
import DropdownShowcase from "@components/commons/dropdown-showcase";
import styled from "@emotion/styled";
import { MapIcon, TravellersIcon } from "@components/commons/icons";
import { getPackages, usePackages } from "@app/modules/packages/actions";

const ContainerCard = styled.div`
  display: flex;
  transform: translate(0%, -50%);
  background-color: white;
  justify-content: center;
  margin: 0 auto;
  width: fit-content;
  heigth: fit-content;
  gap: 0.5rem;
  padding: 1rem 1.1rem;
  box-shadow: 0px 0px 5px black;
  border-radius: 3px;

  @media screen and (max-width: 821px) {
    width: 100%;
    border-radius: 0;
    transform: translate(0%, 0%);
  }

  @media screen and (max-width: 821px) {
    flex-wrap: wrap;
  }

  @media screen and (max-width: 821px) {
    input,
    button,
    .ant-select-selector,
    .ant-picker-input,
    .ant-picker-input-active {
      width: 100% !important;
    }
  }
`;

const MainPageBooking = () => {
  const { control, handleSubmit } = useForm();
  const [store, dispatch] = usePackages();

  React.useEffect(() => {
    getPackages(dispatch, { pageNumber: 1, pageSize: 9 });
  }, []);

  const option = store?.packages.map((e) => ({
    title: e.package_title,
    description: e.package_details,
    slug: e.package_slug,
    url: e.thumbnail,
  }));

  const optionTravellers = Array.from({ length: 5 }, (_, index) => ({
    label: index + 1,
    value: index + 1,
  }));

  const filterOption = (input: string, option): boolean =>
    (option.props.customLabel ?? "")
      .toLowerCase()
      .includes(input.toLowerCase());

  return (
    <div className="relative mx-auto w-full">
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <ContainerCard>
          <Controller
            name="packages"
            control={control}
            render={({ field }) => {
              return (
                <DropdownShowcase
                  {...field}
                  loading={store.isLoading}
                  showSearch
                  data={option}
                  optionLabelProp="customLabel"
                  placeholder="I want to go"
                  filterOption={filterOption}
                  prefixIcon={<MapIcon />}
                />
              );
            }}
          />

          <Controller
            name="date"
            control={control}
            render={({ field }) => {
              return <RangePickerComponent {...field} />;
            }}
          />

          <Controller
            name="pax"
            control={control}
            render={({ field }) => {
              return (
                <AutoComplete
                  {...field}
                  className="w-10"
                  options={optionTravellers}
                  placeholder="Travellers"
                  prefixIcon={<TravellersIcon />}
                  filterOption={(inputValue, option) =>
                    typeof inputValue === "number" &&
                    option?.label === inputValue
                  }
                />
              );
            }}
          />

          <Button
            className="px-10 h-14 font-semibold"
            type="primary"
            htmlType="submit">
            Book
          </Button>
        </ContainerCard>
      </form>
    </div>
  );
};

export default MainPageBooking;
