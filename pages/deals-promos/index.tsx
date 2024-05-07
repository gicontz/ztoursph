import styled from "@emotion/styled";
import { Row } from "@components/commons/common";
import Layout from "@components/pages/layout";
import Button from "@components/commons/button";
import React, { useState } from "react";
import Loading from "@components/commons/loading";
import { getPackages as getPackagesApi } from "@app/services/packages";
import PackageCard from "@components/listing/trip-card";
import HeaderText from "@components/commons/header-text";
import { TCategory } from "@app/modules/trips/types";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Description } from "@components/listing/main-page";
import { getTours } from "@app/services/tours";
import TourCard from "@components/listing/trip-card";

const ListCardsContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1000px;
  margin: auto;
  width: 100%;
  @media (max-width: 1085px) {
    width: 90%;
  }
`;

const LoadMoreButton = styled(Button)`
  margin: auto;

  &.ant-btn-primary {
    background-color: transparent !important;
    border-color: #23432c !important;
    color: #23432c !important;

    &:hover {
      background-color: #23432c !important;
      border-color: #23432c !important;
    }
  }
`;

const DealsAndPromos = () => {
  const { data, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["packages"],
    queryFn: (data) =>
      getPackagesApi({ pageNumber: data.pageParam, pageSize: 9 }),
    initialPageParam: 1,
    getNextPageParam: (_, allPages) => {
      return allPages.length + 1;
    },
  });

  const records = data?.pages.flatMap(({ records }) => records);

  const numberOfPackages = data?.pages?.reduce(
    (a, { records }) => records.length + a,
    0
  );

  const totalPackages = data?.pages[0].totalRecords;

  const packages = records?.flatMap((packages) => ({
    ...packages,
    title: packages.package_title,
    slug: packages.package_slug,
    category: "packages" as TCategory,
  }))?.filter((p) => p.discount > 0);

  const pageSize = 9;
  const [toursState, setTourState] = useState({
    pageNumber: 1,
    totalItems: 0,
    tours: [] as any[],
  });
  const {
    data: tourData,
    isFetching: isTourFetching,
    fetchNextPage: nextTourPage,
  } = useInfiniteQuery({
    queryKey: ["tours_list", toursState.pageNumber],
    queryFn: (data) => getTours({ pageNumber: data.pageParam, pageSize }),
    initialPageParam: 1,
    getNextPageParam: (_, allPages) => {
      return allPages.length + 1;
    },
  });

  const numberOfTours = tourData?.pages.reduce(
    (a, { records }) => records.length + a,
    0
  );
  const totalTours = tourData?.pages[0].totalRecords;
  const tourRecords = tourData?.pages.map(({ records }) => records);

  const trips = tourRecords?.map((list) =>
    list.map((tour) => ({
      ...tour,
      title: tour.tour_title,
      slug: tour.tour_slug,
      category: "tours" as TCategory,
    }))
  ).filter((p) => p.discount > 0);

  return (
    <Layout contained>
      <Row className="!mt-10">
        <HeaderText underline>Our Package Collection</HeaderText>
      </Row>
      <Row className="!mt-5 !mb-10">
        <Description>
          <p>
            Planning your next island getaway without exhausting and breaking
            your savings? Our exclusive and latest deals and promos will serve
            as your ticket for making your island travel wishlist possible! Book
            now with us, and get ready to experience and create an indelible
            memories of a lifetime!
          </p>
        </Description>
      </Row>
      <Row>
        <HeaderText underline>Packages</HeaderText>
        {numberOfPackages !== 0 && records && (
          <>
            <ListCardsContainer className="!mt-4">
              {packages?.map((data, key) => (
                  <PackageCard key={key} data={data} />
                ))}
            </ListCardsContainer>
          </>
        )}
      </Row>
      <Row className="flex flex-col items-center justify-center space-y-5 !my-10">
        {isFetching && <Loading />}
        {totalPackages && numberOfPackages !== totalPackages && (
          <LoadMoreButton onClick={() => fetchNextPage()} type="primary">
            Load More Packages
          </LoadMoreButton>
        )}
        {packages?.length === 0 && <p>No available promos, stay tuned on our future deals.</p>}
      </Row>


      <Row>
        <HeaderText underline>Tours</HeaderText>
        {numberOfTours !== 0 && tourRecords && (
          <>
            <ListCardsContainer className="!mt-4">
              {trips?.map((data, key) => (
                  <TourCard key={key} data={data} />
                ))}
            </ListCardsContainer>
          </>
        )}
      </Row>
      <Row className="flex flex-col items-center justify-center space-y-5 !my-10">
        {isTourFetching && <Loading />}
        {trips?.length !== 0 && totalTours && numberOfTours !== totalTours && (
          <LoadMoreButton onClick={() => nextTourPage()} type="primary">
            Load More Tours
          </LoadMoreButton>
        )}
        {trips?.length === 0 && <p>No available promos, stay tuned on our future deals.</p>}
      </Row>
    </Layout>
  );
};

export default DealsAndPromos;
