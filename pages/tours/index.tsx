import styled from "@emotion/styled";
import HeaderSection from "@components/commons/header-section";
import ListingCard from "@components/listing/listing-card";
import { Row } from "@components/commons/common";
import Layout from "@components/pages/layout";
import Button from "@components/commons/button";
import React from "react";
import { TToursResponse } from "@app/modules/tours/types";
import Loading from "@components/commons/loading";
import { getTours, useTours } from "@app/modules/tours/actions";

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

const Panel = styled(Row)`
  display: flex;
  width: 67rem;
  margin: auto;
  margin-bottom: 1rem;
  flex-direction: column;
  gap: 10px;
  @media (max-width: 1000px) {
    font-size: 0.6rem;
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
  const [store, dispatch] = useTours();

  React.useEffect(() => {
    getTours(dispatch, { pageNumber: 1, pageSize: 9 });
  }, []);

  return (
    <Layout>
      <Panel>
        <HeaderSection>Our Tour Collection</HeaderSection>
        <Description>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            pharetra, lacus eget consectetur eleifend, quam sem mattis dolor,
            non sodales tellus nulla nec est.
          </p>
        </Description>

        {!store.isLoading && store?.tours.length !== 0 && store.tours ? (
          <>
            <ListCardsContainer>
              {store.tours?.map((data, key) => (
                <ListingCard key={key} data={data} />
              ))}
            </ListCardsContainer>
            <LoadMoreButton
              onClick={() => console.log("Load More Tours")}
              type="primary">
              Load More Tours
            </LoadMoreButton>
          </>
        ) : (
          <Loading />
        )}
      </Panel>
    </Layout>
  );
}
