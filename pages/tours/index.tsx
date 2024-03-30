import styled from "@emotion/styled";
import { Row } from "@components/commons/common";
import Layout from "@components/pages/layout";
import Button from "@components/commons/button";
import React, { useState } from "react";
import Loading from "@components/commons/loading";
import TourCard from "@components/listing/trip-card";
import HeaderText from "@components/commons/header-text";
import { TCategory } from "@app/modules/trips/types";
import {
  useQuery,
  keepPreviousData,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { getTours } from "@app/services/tours";

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
    tours: [] as any[],
  });
  const { data, isFetching, fetchNextPage } = useInfiniteQuery({
    queryKey: ["tours_list", state.pageNumber],
    queryFn: (data) => getTours({ pageNumber: data.pageParam, pageSize }),
    initialPageParam: 1,
    getNextPageParam: (_, allPages) => {
      return allPages.length + 1;
    },
  });

  const numberOfTours = data?.pages.reduce(
    (a, { records }) => records.length + a,
    0
  );
  const totalTours = data?.pages[0].totalRecords;
  const records = data?.pages.map(({ records }) => records);

  const trips = records?.map((list) =>
    list.map((tour) => ({
      ...tour,
      title: tour.tour_title,
      slug: tour.tour_slug,
      category: "tours" as TCategory,
    }))
  );

  return (
    <Layout contained>
      <Row className="!mt-10">
        <HeaderText underline>Our Tour Collection</HeaderText>
      </Row>
      <Row className="!mt-5 !mb-10">
        <Description>
          <p>
            Well-planned getaways lead to extraordinary adventure experiences!
            Book your El Nido plans with us, confirm your reservation, and get
            ready for a stress-free and memorable trip to a tropical paradise
            like El Nido, Palawan. Your another memorable moment of sun-kissed
            adventure is waiting for you on the horizon! Join us & enjoy! The
            following are the tours we offer, indicating every tour detail and
            its rates.
          </p>
        </Description>
      </Row>

      <Row>
        {numberOfTours !== 0 && records && (
          <>
            <ListCardsContainer>
              {trips?.map((data, key1) =>
                data.map((data, key2) => (
                  <TourCard key={`${key1}-${key2}`} data={data} />
                ))
              )}
            </ListCardsContainer>
          </>
        )}
      </Row>
      <Row className="flex flex-col items-center justify-center space-y-5 !my-10">
        {isFetching && <Loading />}
        {totalTours && totalTours !== numberOfTours && (
          <LoadMoreButton onClick={() => fetchNextPage()} type="primary">
            Load More Tours
          </LoadMoreButton>
        )}
      </Row>
    </Layout>
  );
}
