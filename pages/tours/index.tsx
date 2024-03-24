import styled from "@emotion/styled";
import { Row } from "@components/commons/common";
import Layout from "@components/pages/layout";
import Button from "@components/commons/button";
import React, { useState } from "react";
import Loading from "@components/commons/loading";
import { getTours, useTours } from "@app/modules/tours/actions";
import TourCard from "@components/listing/trip-card";
import HeaderText from "@components/commons/header-text";
import { TCategory } from "@app/modules/trips/types";

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
  const [store, dispatch] = useTours();

  React.useEffect(() => {
    const { pageNumber } = state;
    getTours(dispatch, { pageNumber, pageSize });
    //eslint-disable-next-line
  }, []);

  const handleLoadMore = () => {
    if (store.totalRecords > state.totalItems) {
      const { pageNumber } = state;
      getTours(dispatch, { pageNumber: pageNumber + 1, pageSize });
      setState((s) => ({
        ...s,
        pageNumber: s.pageNumber + 1,
        totalItems: s.totalItems + pageSize,
      }));
    }
  };

  const trips = store.tours.map((tour) => ({
    ...tour,
    title: tour.tour_title,
    slug: tour.tour_slug,
    category: 'tours' as TCategory,
  }));

  return (
    <Layout contained>
      <Row className="!mt-10">
        <HeaderText underline>Our Tour Collection</HeaderText>
      </Row>
      <Row className="!mt-5 !mb-10">
        <Description>
          <p>
            Well-planned getaways lead to extraordinary adventure experiences! Book your El Nido plans with us, confirm your reservation, and get ready for a stress-free and memorable trip to a tropical paradise like El Nido, Palawan. Your another memorable moment of sun-kissed adventure is waiting for you on the horizon! Join us & enjoy! The following are the tours we offer, indicating every tour detail and its rates.
          </p>
        </Description>
      </Row>

      <Row>
        {store?.tours.length !== 0 && store.tours && (
          <>
            <ListCardsContainer>
              {trips?.map((data, key) => (
                <TourCard key={key} data={data} />
              ))}
            </ListCardsContainer>
          </>
        )}
      </Row>
      <Row className="flex flex-col items-center justify-center space-y-5 !my-10">
        {store.isLoading && <Loading />}
        {store.tours.length > 0 &&
          store.tours.length !== store.totalRecords && (
            <LoadMoreButton onClick={handleLoadMore} type="primary">
              Load More Tours
            </LoadMoreButton>
          )}
      </Row>
    </Layout>
  );
}
