import styled from "@emotion/styled";
import { Row } from "@components/commons/common";
import Layout from "@components/pages/layout";
import Button from "@components/commons/button";
import React from "react";
import Loading from "@components/commons/loading";
import { getPackages as getPackagesApi } from "@app/services/packages";
import PackageCard from "@components/listing/trip-card";
import HeaderText from "@components/commons/header-text";
import { TCategory } from "@app/modules/trips/types";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

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

const Description = styled.div`
  font-size: 0.9rem;
  display: flex;
  color: #596363;
  justify-content: space-between;

  a {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    font-size: 0.6rem;
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

export default function Tours() {
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
  }));

  return (
    <Layout contained>
      <Row className="!mt-10">
        <HeaderText underline>Our Package Collection</HeaderText>
      </Row>
      <Row className="!mt-5 !mb-10">
        <Description>
          <p>
            Created to flip your moments into memory of a lifetime. Z Tours.ph
            offers the best Packages that you&apos;ll surely love to try. These
            packages are meticulously went under a needle&apos;s hole in order
            to ensure that aside from providing great itineraries, it&apos;s
            also worthy of every penny you&apos;ve spent. Check out your
            reservation now!
          </p>
        </Description>
      </Row>

      <Row>
        {numberOfPackages !== 0 && records && (
          <>
            <ListCardsContainer>
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
            Load More Tours
          </LoadMoreButton>
        )}
      </Row>
    </Layout>
  );
}
