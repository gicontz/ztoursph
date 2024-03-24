import { PanelSection } from "@components/commons/common";
import styled from "@emotion/styled";
import Link from "next/link";
import React from "react";
import { getTours, useTours } from "@app/modules/tours/actions";
import TourCard from "./trip-card";
import Skeleton from "@components/commons/skeleton";
import HeaderText from "@components/commons/header-text";
import { TCategory } from "@app/modules/trips/types";

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
  p{
    width: 70%;
  }

  @media (max-width: 768px) {
    font-size: 0.6rem;
  }
`;

const MainPageListing = () => {
  const [store, dispatch] = useTours();

  React.useEffect(() => {
    getTours(dispatch, { pageNumber: 1, pageSize: 4 });
    //eslint-disable-next-line
  }, []);

  const trips = store.tours.map((tour) => ({
    ...tour,
    title: tour.tour_title,
    slug: tour.tour_slug,
    category: 'tours' as TCategory,
  }))

  return (
    <Panel>
      <HeaderText underline>Packand Go: Set Your Adventurous Seascapes with ZTours.ph</HeaderText>
      <Description>
        <p>Nothing beats nature&apos;s vibe! Experience the most enchanting hideaways, awe-inspiring islands, and underwater adventures tailored just for you! So, what are you waiting for? Book your exciting adventure with us!</p>
        <Link href={"/tours"}>View All Tours</Link>
      </Description>
      {!store.isLoading && store.tours ? (
        <ListCardsContainer>
          {trips?.slice(0, 4).map((data, key) => (
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
