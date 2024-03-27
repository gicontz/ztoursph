import styled from "@emotion/styled";
import { Row } from "@components/commons/common";
import Layout from "@components/pages/layout";
import Button from "@components/commons/button";
import React, { useState } from "react";
import Loading from "@components/commons/loading";
import {
  getPackages as getPackagesApi,
} from "@app/services/packages";
import PackageCard from "@components/listing/trip-card";
import HeaderText from "@components/commons/header-text";
import { TCategory } from "@app/modules/trips/types";
import { useQuery } from "@tanstack/react-query";

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
  const pageSize = 9;
  const [state, setState] = useState({
    pageNumber: 1,
    totalItems: 0,
  });
  const packagesQuery = useQuery({ queryKey: ["packages"], queryFn: () => getPackagesApi({ pageNumber: state.pageNumber, pageSize: 4 }) });
  
  const packageData = packagesQuery.data

  const handleLoadMore = () => {
    if (packageData.totalRecords > state.totalItems) {
      setState((s) => ({
        ...s,
        pageNumber: s.pageNumber + 1,
        totalItems: s.totalItems + pageSize,
      }));
    }
  };
  
  const packages = packageData?.records.map((tour) => ({
    ...tour,
    title: tour.package_title,
    slug: tour.package_slug,
    category: 'packages' as TCategory,
  }))

  return (
    <Layout contained>
      <Row className="!mt-10">
        <HeaderText underline>Our Package Collection</HeaderText>
      </Row>
      <Row className="!mt-5 !mb-10">
        <Description>
          <p>
          Created to flip your moments into memory of a lifetime. Z Tours.ph offers the best Packages that you&apos;ll surely love to try. These packages are meticulously went under a needle&apos;s hole in order to ensure that aside from providing great itineraries, it&apos;s also worthy of every penny you&apos;ve spent. Check out your reservation now!
          </p>
        </Description>
      </Row>

      <Row>
        {packageData?.records.length !== 0 && packageData?.records && (
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
        {packagesQuery.isLoading && <Loading />}
        {packageData?.records.length > 0 &&
          packageData?.records.length !== packageData?.totalRecords && (
            <LoadMoreButton onClick={handleLoadMore} type="primary">
              Load More Tours
            </LoadMoreButton>
          )}
      </Row>
    </Layout>
  );
}
