import { PanelSection } from "@components/commons/common";
import HeaderSection from "@components/commons/header-section";
import styled from "@emotion/styled";
import Link from "next/link";
import React from "react";
import ListingCard from "./listing-card";
import TourA from "@assets/images/tour_a.jpg";
import TourB from "@assets/images/tour_b.jpg";
import TourC from "@assets/images/tour_c.jpg";
import { getTours } from "@app/services/tours";
import { TToursResponse } from "@app/pages/tours/types";
import Loading from "@components/commons/loading";

const ListCardsContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: space-around;
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
  const [state, setState] = React.useState<
    { data?: TToursResponse[] | undefined } & { isLoading: boolean }
  >({
    isLoading: true,
  });
  React.useEffect(() => {
    (async () => {
      setState((s) => ({ ...s, isLoading: true }));
      const { data } = await getTours();
      if (data) {
        setState({ data: Object.values(data), isLoading: false });
      }
    })();
  }, []);

  return (
    <Panel>
      <HeaderSection>Adventure, guided wonders await.</HeaderSection>
      <Description>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <Link href={"/tours"}>View All Tours</Link>
      </Description>
      <ListCardsContainer>
        {!state.isLoading && state.data ? (
          state.data
            ?.slice(0, 3)
            .map((data, key) => <ListingCard key={key} data={data} />)
        ) : (
          <Loading />
        )}
      </ListCardsContainer>
    </Panel>
  );
};

export default MainPageListing;
