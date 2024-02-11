import { PanelSection } from "@components/commons/common";
import HeaderSection from "@components/commons/header-section";
import styled from "@emotion/styled";
import Link from "next/link";
import React from "react";
import { getTours, useTours } from "@app/modules/tours/actions";
import TourCard from "./tours-card";
import Skeleton from "@components/commons/skeleton";

const ListCardsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  gap: 0.5rem;
  justify-content: space-around;
  @media (max-width: 1000px) {
    flex-wrap: wrap;
  }
`;

const Panel = styled(PanelSection)`
  display: flex;
  flex-direction: column;
  gap: 10px;
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

const MainPageListing = () => {
  const [store, dispatch] = useTours();

  React.useEffect(() => {
    getTours(dispatch, { pageNumber: 1, pageSize: 4 });
  }, []);

  return (
    <Panel>
      <HeaderSection>Adventure, guided wonders await.</HeaderSection>
      <Description>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <Link href={"/tours"}>View All Tours</Link>
      </Description>
      {!store.isLoading && store.tours ? (
        <ListCardsContainer>
          {store.tours?.slice(0, 4).map((data, key) => (
            <TourCard key={key} data={data} />
          ))}
        </ListCardsContainer>
      ) : (
        <ListCardsContainer>
          {Array.from({ length: 4 }).map((_, key) => (
            <Skeleton
              key={key}
              className="h-[24rem] w-[80rem]"
              times={undefined}
            />
          ))}
        </ListCardsContainer>
      )}
    </Panel>
  );
};

export default MainPageListing;
