
import { Row } from "@components/commons/common";
import PageBanner from "@components/pages/page-banner";
import styled from "@emotion/styled";
import { Poppins, Source_Serif_4 } from "next/font/google";
import React, { useCallback, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { classNames } from "@app/utils/helpers";
import CheckoutForm from "@app/layouts/forms/CheckoutForm";
import LOCAL_STORAGE from "@constants/localstorage";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { Added_Trips } from "@constants/added_trips";
import { useTripsContext } from "@providers/trips";
import { getTrips, useTours } from "@app/modules/tours/actions";
import { getItinerary } from "@app/services/checkout";
import itineraryJson from "@constants/test/itineray.json";

const font = Poppins({
  weight: "400",
  subsets: ["latin"],
});

const Container = styled(Row)`
  color: #23432c;
  padding: 1rem;
`;

export default function Checkout() {
  const router = useRouter();
  const [cookies] = useCookies([Added_Trips]);
  const [ store, dispatch ] = useTours();
  const { tripStore, tripDispatch } = useTripsContext();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const trips = cookies[Added_Trips] ?? [];

  const getTripsData = useCallback(() => {
    const tripIds = trips.map(({ tripId }) => tripId );
    if (tripIds) getTrips(dispatch, tripIds);
  }, [dispatch, trips]);

  useEffect(() => {
    getTripsData();
  }, [getTripsData, tripStore.trips]);

  const pricedTrips = useMemo(() => {
    return trips.map((t) => ({
      ...t,
      id: t.tripId,
      pax: t.numberOfTraveller,
      subtotal: (parseInt(store.trips.find(({ id }) => id === t.tripId)?.price as any, 10)) * t.numberOfTraveller,
    }));
  }, [store.trips, trips]);

  const guests = typeof localStorage !== 'undefined' ? 
  JSON.parse(localStorage.getItem(LOCAL_STORAGE.guests) ?? "[]").map((g) => ({
      name: classNames(g.firstName, g.middleInitial, g.lastName, g.suffix && `, ${g.suffix}`),
      age: g.age,
      natinality: g.nationality,
  })) : 
  [];

  console.log(store.trips, pricedTrips);

  useEffect(() => {
    if (guests.length === 0) {
      alert("You do not have any guests added. Please add guests first.");
      router.push("/trips");
    }
  }, [guests]);

  const handleViewItinerary = (data) => {
    const content = {
      ...data,
      guests,
      booked_tours: pricedTrips,
    };
    getItinerary({ content: { ...itineraryJson }} as any).then((res) => {
      console.log(res)
    });;
  };

  const handleCheckout = (data) => {

  }

  return (
    <>
      <PageBanner
        title={"Checkout"}
        bannerImage="/banner.jpg"
        description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
      />
      <Container className={font.className}>
        <CheckoutForm 
          onViewItinerary={handleViewItinerary}
          onCheckout={handleCheckout}/>
      </Container>
    </>
  );
}
