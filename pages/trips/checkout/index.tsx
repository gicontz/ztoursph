import { Row } from "@components/commons/common";
import PageBanner from "@components/pages/page-banner";
import styled from "@emotion/styled";
import { Poppins, Source_Serif_4 } from "next/font/google";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { classNames } from "@app/utils/helpers";
import LOCAL_STORAGE from "@constants/localstorage";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { Added_Trips } from "@constants/added_trips";
import { useTripsContext } from "@providers/trips";
import { getTrips, useTours } from "@app/modules/tours/actions";
import { getItinerary } from "@app/services/checkout";
import itineraryJson from "@constants/test/itineray.json";
import { getAge } from "@constants/dates";
import { useDialog } from "@providers/dialog";
import CreateBooking from "@app/layouts/modals/CreateBooking";

import dynamic from "next/dynamic";
import { TTrip } from "@app/modules/trips/types";
import Loading from "@components/commons/loading";

const CheckoutForm = dynamic(() => import("@app/layouts/forms/CheckoutForm"), {
  ssr: false,
});

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
  const [store, dispatch] = useTours();
  const { tripStore, tripDispatch } = useTripsContext();
  const [loadingItinerary, setLoadingItinerary] = useState(false);
  const [openDialog, closeDialog] = useDialog();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const trips: TTrip[] = cookies[Added_Trips] ?? [];

  const getTripsData = useCallback(() => {
    const tripIds = trips.map(({ tripId }) => tripId);
    if (tripIds) getTrips(dispatch, tripIds);
  }, [dispatch, trips]);

  useEffect(() => {
    getTripsData();
  }, []);

  const pricedTrips = useMemo(() => {
    return trips.map((t) => ({
      ...t,
      id: t.tripId,
      pax: t.numberOfTraveller,
      subtotal: (
        parseInt(
          store.trips.find(({ id }) => id === t.tripId)?.price as any,
          10
        ) * t.numberOfTraveller
      ).toString(),
    }));
  }, [store.trips, trips]);

  const guests =
    typeof localStorage !== "undefined"
      ? JSON.parse(localStorage.getItem(LOCAL_STORAGE.guests) ?? "[]").map(
          (g) => ({
            id: g.id,
            name: classNames(
              g.firstName,
              g.middleInitial,
              g.lastName,
              g.suffix && `, ${g.suffix}`
            ),
            age: g.age,
            nationality: g.nationality,
          })
        )
      : [];

  useEffect(() => {
    if (guests.length === 0) {
      alert("You do not have any guests added. Please add guests first.");
      router.push("/trips");
    }
  }, [guests]);

  const handleViewItinerary = (data) => {
    setLoadingItinerary(true);
    const mobileNumber1 = `${data.mobileNumber1.countryCode}-${data.mobileNumber1.number}`;
    const mobileNumber2 = `${data.mobileNumber2.countryCode}-${data.mobileNumber2.number}`;

    const guestsPerTour = trips.reduce(
      (acc, trip) => ({
        ...acc,
        [trip.tripId]: [
          ...guests.filter(({ id }) => trip.participants.includes(id)),
        ],
      }),
      {}
    );

    const content = {
      ...data,
      referenceNumber: "PENDING",
      booking_date: new Date().toISOString(),
      age: getAge(data.birthday),
      mobileNumber1: mobileNumber1,
      mobileNumber2: mobileNumber2,
      guests: guestsPerTour,
      booked_tours: pricedTrips,
    };
    getItinerary({ content } as any)
      .then((res) => {
        const newTab = window.open(res.data.blobUrl, "_blank");
        newTab?.focus();
      })
      .finally(() => {
        setLoadingItinerary(false);
      });
  };

  const handleCheckout = (data) => {
    const namedPackages = pricedTrips.map((p) => ({
      ...p,
      participants: p.participants.map((id) => ({
        ...guests.find((g) => g.id === id),
      })),
    }));

    const payload = {
      userEmail: data.email,
      first_name: data.firstName,
      middle_init: data.middleInitial,
      last_name: data.lastName,
      mobile_number1: data.mobileNumber1,
      mobile_number2: data.mobileNumber2,
      birthday: data.birthday,
      sex: data.sex,
      nationality: data.nationality,
      packages: namedPackages,
    };

    openDialog({
      children: <CreateBooking bookingInfo={payload} onClose={closeDialog} />,
    });
  };

  return (
    <>
      <PageBanner
        title={"Checkout"}
        bannerImage="/banner.jpg"
        description={
          "We are excited to have you on board! Please fill out the form below to proceed with your booking."
        }
      />
      <Container className={classNames("relative", font.className)}>
        <CheckoutForm
          onViewItinerary={handleViewItinerary}
          onCheckout={handleCheckout}
        />
        {loadingItinerary && (
          <div className="absolute flex items-center justify-center w-full h-full top-0 left-0 bg-[rgba(0,0,0,0.5)] z-30">
              <Loading />
          </div>
        )}
      </Container>
    </>
  );
}
