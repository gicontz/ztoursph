import React, { useState } from "react";
import { useForm } from "react-hook-form";

import RangePickerComponent from "@components/commons/range-picker";
import Button from "@components/commons/button";
import AutoComplete from "@components/commons/autocomplete";
import DropdownShowcase from "@components/commons/dropdown-showcase";

import styled from "@emotion/styled";
import { MapIcon, TravellersIcon } from "@components/commons/icons";
import { getPackages, usePackages } from "@app/modules/packages/actions";

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
  const pageSize = 3;
  const { handleSubmit, control } = useForm();
  const [store, dispatch] = usePackages();
  const [state, setState] = useState({ pageNumber: 1, totalItems: 0 });

  React.useEffect(() => {
    const { pageNumber } = state;
    getPackages(dispatch, { pageNumber, pageSize });
  }, []);

  const HandleLoadPackage = (d: boolean) => {
    if (store.totalRecords > state.totalItems && d) {
      const { pageNumber } = state;
      getPackages(dispatch, { pageNumber: pageNumber, pageSize });
      setState((prev) => ({
        ...prev,
        pageNumber: prev.pageNumber + 1,
        totalItems: pageSize,
      }));
    }
  };

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

  const isLoadingData = React.useMemo(() => store.isLoading, [store.isLoading]);

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <ContainerCard>
        <DropdownShowcase
          showSearch
          loading={isLoadingData}
          loadMore={isLoadingData}
          data={option}
          control={control}
          name="Tour"
          optionLabelProp="customLabel"
          placeholder="I want to go"
          filterOption={filterOption}
          prefixIcon={<MapIcon />}
          view={HandleLoadPackage}
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
