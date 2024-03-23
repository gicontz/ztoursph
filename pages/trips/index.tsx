import PageTitle from "@components/pages/page-title";
import React, { useEffect, useMemo } from "react";
import BannerImage from "@assets/images/banner.jpg";
import Layout from "@components/pages/layout";
import { Row } from "@components/commons/common";
import TourA from "@assets/images/tour_a.jpg";
import TourB from "@assets/images/tour_b.jpg";
import TourC from "@assets/images/tour_c.jpg";
import styled from "@emotion/styled";
import TripsTable from "@components/trips/tripsTable";
import { useTripsContext } from "@providers/trips";
import { getTrips, useTours } from "@app/modules/tours/actions";

const Panel = styled(Row)`
  margin: 2rem auto;
  width: 100%;
  diplay: flex;
  flex-direction: column;
`;

export default function Trips() {
  const { tripStore } = useTripsContext();
  const [store, dispatch] = useTours();

  useEffect(() => {
    getTrips(dispatch, tripStore.trips.map(({ tripId }) => tripId ) ?? []);
  }, []);

  const myTrips = useMemo(() => {
    const trips = tripStore.trips.map((trip) => ({
      tripId: trip.tripId,
      title: trip.title,
      imageUrl: trip.thumbnail,
      date: trip.date,
      pickup: trip.location,
      numberOfTraveller: trip.participants.length,
    }));
    console.log(tripStore.trips)
    return trips.map((t) => ({
      ...t,
      price: store.trips.find(({ id }) => id === t.tripId )?.price ?? 0,
    }))
  }, [tripStore.trips]);

  console.log(tripStore, myTrips);

  return (
    <Layout>
      <PageTitle title="My Trips" bgImage={BannerImage} />
      <Panel>
        <TripsTable data={myTrips} />
      </Panel>
    </Layout>
  );
}
