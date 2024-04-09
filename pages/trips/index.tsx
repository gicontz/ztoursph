import PageTitle from "@components/pages/page-title";
import React, { useCallback, useEffect, useMemo } from "react";
import BannerImage from "@assets/images/banner.jpg";
import Layout from "@components/pages/layout";
import { Row } from "@components/commons/common";
import styled from "@emotion/styled";
import TripsTable from "@components/trips/tripsTable";
import { useTripsContext } from "@providers/trips";
import { getTrips, useTours } from "@app/modules/tours/actions";
import { getTrips as getTheTrips } from "@app/modules/trips/actions";
import { useCookies } from "react-cookie";
import { Added_Trips } from "@constants/added_trips";
import LOCAL_STORAGE from "@constants/localstorage";
import { TGuest } from "@components/checkout/guest";

const Panel = styled(Row)`
  margin: 2rem auto;
  width: 100%;
  diplay: flex;
  flex-direction: column;
`;

export default function Trips() {
  const { tripStore, tripDispatch } = useTripsContext();
  const [cookie] = useCookies([Added_Trips]);
  
  useEffect(() => {
    getTheTrips(tripDispatch, cookie[Added_Trips] ?? []);
  }, []);
  
  const [store, dispatch] = useTours();

  useEffect(() => {
    getTripsData();
  }, [tripStore.trips]);

  const getTripsData = useCallback(() => {
    const tripIds = tripStore.trips.map(({ tripId }) => tripId );
    if (tripIds) getTrips(dispatch, tripIds);
  }, [tripStore.trips]);

  const myTrips = useMemo(() => {
    const guestsData = typeof localStorage !== 'undefined' ? localStorage.getItem(LOCAL_STORAGE.guests) ?? "[]" : "[]";
    const guests: TGuest[] = JSON.parse(guestsData);
    const trips = tripStore.trips.map((trip) => {
      const ages = trip.participants.map((p) => guests.find(({ id }) => id === p)?.age ?? 0);
      return {
        ...trip,
        imageUrl: trip.thumbnail,
        pickup: trip.location,
        discount: 0,
        numberOfTraveller: trip.numberOfTraveller,
        ages,
      }
    });
    return trips.map((t) => ({
      ...t,
      price: store.trips.find(({ id }) => id === t.tripId )?.price ?? 0,
    }))
  }, [tripStore.trips, store.trips]);

  const isLoading = store.isLoading && tripStore.isLoading;

  return (
    <Layout>
      <PageTitle title="My Trips" bgImage={BannerImage} />
      <Panel>
        <TripsTable data={myTrips} isLoading={isLoading}/>
      </Panel>
    </Layout>
  );
}
