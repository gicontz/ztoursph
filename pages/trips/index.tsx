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
import { useCookies } from "react-cookie";
import { MY_TRIPS } from "@constants/cookies";

const Panel = styled(Row)`
  margin: 2rem auto;
  width: 100%;
  diplay: flex;
  flex-direction: column;
`;

export default function Trips() {
  const [cookies] = useCookies([MY_TRIPS]);
  
  return (
    <Layout>
    <PageTitle title="My Trips" bgImage={BannerImage} />
      <Panel>
        <TripsTable data={cookies[MY_TRIPS]} />
      </Panel>
    </Layout>
  );
}
