import React from "react";
import { Controller, useForm } from "react-hook-form";
import { debounce } from "lodash";
import RangePickerComponent from "@components/commons/range-picker";
import Button from "@components/commons/button";
import AutoComplete from "@components/commons/autocomplete";
import DropdownShowcase from "@components/commons/dropdown-showcase";
import styled from "@emotion/styled";
import { MapIcon, TravellersIcon } from "@components/commons/icons";
import { getPackages } from "@app/services/packages";
import { useRouter } from "next/router";
import { useInfiniteQuery } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "@constants/validations/bookingComponent";

const ContainerCard = styled.div`
  display: flex;
  transform: translate(0%, -50%);
  background-color: white;
  justify-content: center;
  margin: 0 auto;
  width: fit-content;
  height: fit-content;
  gap: 0.5rem;
  padding: 1rem 1.1rem;
  box-shadow: 0px 0px 5px black;
  border-radius: 3px;

  @media screen and (max-width: 821px) {
    width: 100%;
    border-radius: 0;
    box-shadow: none;
    transform: translate(0%, 0%);
    flex-wrap: wrap;
    input,
    button,
    .ant-select-selector,
    .ant-picker-input,
    .ant-picker-input-active {
      width: 100% !important;
    }
  }
`;

export default function MainPageBooking() {
  const router = useRouter();
  const { handleSubmit, control, formState } = useForm({
    resolver: yupResolver(schema),
  });

  const { data, isFetching, fetchNextPage } = useInfiniteQuery({
    queryKey: ["package_list"],
    queryFn: async (data) => {
      return await getPackages({
        pageNumber: data.pageParam,
        pageSize: 5,
      });
    },
    initialPageParam: 1,
    getNextPageParam: (_, allPages) => {
      return allPages.length + 1;
    },
  });

  const numberOfTours = data?.pages.reduce((a, d) => d.records?.length + a, 0);
  const totalTours = data?.pages[0].totalRecords;
  const records = data?.pages.map(({ records }) => records);

  const option = records?.flatMap((package_list) =>
    package_list?.map((packages) => ({
      title: packages?.package_title,
      description: packages?.package_details,
      slug: packages?.package_slug,
      url: packages?.thumbnail,
    }))
  );

  const HandleLoadMore = debounce((e) => {
    const isAtBottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;

    if (isAtBottom && !isFetching && totalTours !== numberOfTours) {
      fetchNextPage();
    }
  });

  const optionTravellers = Array.from({ length: 5 }, (_, index) => ({
    label: index + 1,
    value: index + 1,
  }));

  const filterOption = (input: string, option): boolean =>
    (option.props.customLabel ?? "")
      .toLowerCase()
      .includes(input.toLowerCase());

  const onSubmit = (data: { packages: any }) => {
    if (data.packages) router.push(`/packages/${data.packages}`);
  };

  return (
    <div className="relative mx-auto w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <ContainerCard>
          <Controller
            name="packages"
            control={control}
            render={({ field }) => (
              <DropdownShowcase
                className="h-14 w-80 [&>div>.ant-select-selector>span>input]:text-base [&>div>.ant-select>span>input]:lg:text-sm"
                onChange={field.onChange as any}
                showSearch
                hasError={formState.errors.packages !== undefined}
                loadMore={isFetching}
                onPopupScroll={HandleLoadMore}
                data={option}
                optionLabelProp="customLabel"
                placeholder="I want to go"
                filterOption={filterOption}
                prefixIcon={<MapIcon />}
              />
            )}
          />

          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <RangePickerComponent
                className="[&>.ant-picker-input>input]:text-base [&>.ant-picker-input>input]:lg:text-sm"
                hasError={formState.errors.date !== undefined}
                onChange={field.onChange}
              />
            )}
          />

          <Controller
            name="pax"
            control={control}
            render={({ field }) => (
              <AutoComplete
                onChange={field.onChange}
                className="w-10 [&>div>span>input]:text-base [&>div>span>input]:lg:text-sm"
                hasError={formState.errors.pax !== undefined}
                options={optionTravellers}
                placeholder="Travellers"
                prefixicon={<TravellersIcon />}
                filterOption={(inputValue, option) =>
                  typeof inputValue === "number" && option?.label === inputValue
                }
              />
            )}
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
}
