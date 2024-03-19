import PageTitle from "@components/pages/page-title";
import React from "react";
import BannerImage from "@assets/images/banner.jpg";
import Layout from "@components/pages/layout";
import { Row } from "@components/commons/common";
import TourA from "@assets/images/tour_a.jpg";
import TourB from "@assets/images/tour_b.jpg";
import TourC from "@assets/images/tour_c.jpg";
import styled from "@emotion/styled";
import TripsTable from "@components/trips/tripsTable";

const Panel = styled(Row)`
  margin: 2rem auto;
  width: 100%;
  diplay: flex;
  flex-direction: column;
`;

export default function Trips() {
  const PackageDetail = [
    {
      title: "El Nido Island Tour A",
      imageUrl: TourA,
      date: "01/31/2024",
      pickup: "To be Decided",
      price: 1000,
      numberOfTraveller: 2,
    },
    {
      title: "El Nido Island Tour B",
      imageUrl: TourB,
      date: "01/31/2024",
      pickup: "To be Decided",
      price: 1000,
      numberOfTraveller: 2,
    },
    {
      title: "El Nido Island Tour C",
      imageUrl: TourC,
      date: "01/31/2024",
      pickup: "To be Decided",
      price: 1000,
      numberOfTraveller: 2,
    },
  ];
  return (
    <Layout>
      <PageTitle title="My Trips" bgImage={BannerImage} />
      <Panel>
        <TripsTable data={PackageDetail} />
      </Panel>
    </Layout>
  );
}
