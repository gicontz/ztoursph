import { Row, StyledDivider } from "@components/commons/common";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import PageTitle from "@components/pages/page-title";
import Layout from "@components/pages/layout";
import React from "react";
import parse from "html-react-parser";
import Skeleton from "@components/commons/skeleton";
import { getTourBySlug, useTours } from "@app/modules/tours/actions";
import BookingForm from "@components/commons/booking-form";
import ImageTemplate from "@components/commons/image-template";
import { addToTrips } from "@app/modules/trips/actions";
import { useTripsContext } from "@providers/trips";
import { useCookies } from "react-cookie";
import { Added_Trips } from "@constants/added_trips";

const Panel = styled(Row)`
  display: flex;
  flex-direction: column;
  font-size: 1.1rem;
  gap: 1rem;
  line-height: 1.7rem;
  margin: 0 auto;
  margin-bottom: 1rem;
  width: 50rem;

  h2,
  h4 {
    color: #23432c;
    font-family: "Source_Serif_Pro";
    font-size: 1.5rem;
    font-weight: 900;
    line-height: 1rem;
  }
  @media screen and (max-width: 740px) {
    width: 90%;
  }
`;

const PackageDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  ul {
    list-style-type: none;
    padding-left: 20px;
  }

  li {
    margin: 2px 0;
  }

  li::marker {
    content: "• ";
    color: black;
    font-size: 15px;
    margin-right: 10px;
  }
`;
export default function Tours() {
  const router = useRouter();
  const [booking, setBooking] = useCookies([Added_Trips]);
  const slug = router.query.slug;
  const [store, dispatch] = useTours();
  const { tripDispatch } = useTripsContext();

  React.useEffect(() => {
    if (typeof slug === "string") getTourBySlug(dispatch, slug);
    //eslint-disable-next-line
  }, [slug]);

  const handleSubmit = (trip) => {
    addToTrips(tripDispatch, trip);
    const data = booking[Added_Trips]
      ? booking[Added_Trips].slice().concat(trip)
      : [trip];
    setBooking(Added_Trips, data);
  };

  const parsedPackageDetails = store.selectedTour ? (
    parse(store.selectedTour.package_details ?? "")
  ) : (
    <>
      <Skeleton times={1} className="h-5" />
      <Skeleton times={3} className="h-3 w-11/12" />
      <Skeleton times={4} className="h-4 w-9/12" />
    </>
  );

  const priceContent =
    (store.selectedTour?.discount ?? 0) > 0 &&
    store.selectedTour?.discount &&
    !store.isLoading ? (
      <div className=" px-2 py-2 font-semibold w-full bg-gray-100 flex gap-2 items-center">
        <p className=" text-[1rem] line-through opacity-90">
          ₱ {store.selectedTour.price}
        </p>
        <p className="text-2xl ">
          ₱{" "}
          {store.selectedTour.price -
            (store.selectedTour?.discount / 100) * store.selectedTour.price}
        </p>
        <div className="text-xs px-1 bg-[rgb(35,67,44)] text-white">
          -{store.selectedTour.discount}%
        </div>
      </div>
    ) : store.selectedTour?.price && !store.isLoading ? (
      <p className="text-2xl px-2 py-2 font-semibold w-full bg-gray-100">
        ₱{store.selectedTour?.price}
      </p>
    ) : (
      <Skeleton times={1} className="h-[2.5rem]" />
    );

  const detail = {
    tourId: store.selectedTour?.id,
    title: store.selectedTour?.tour_title,
    thumbnail: store.selectedTour?.thumbnail,
  };

  return (
    <Layout>
      <div>
        {store.selectedTour && !store.isLoading ? (
          <PageTitle
            title={store.selectedTour.tour_title}
            bgImage={store.selectedTour.tour_banner_image}
          />
        ) : (
          <Skeleton times={1} className="h-[350px]" />
        )}
      </div>
      <Panel>
        <Row>
          <div className="mt-[2rem] flex flex-col gap-2">
            <h2>Package Details</h2>
            {priceContent}
          </div>
        </Row>
        <Row>
          <PackageDetail>
            {parsedPackageDetails && !store.isLoading ? (
              parsedPackageDetails
            ) : (
              <>
                <Skeleton times={1} className="h-5" />
                <Skeleton times={3} className="h-3 w-11/12" />
                <Skeleton times={4} className="h-4 w-9/12" />
              </>
            )}
          </PackageDetail>
        </Row>
        <Row className="flex flex-col gap-[1rem]">
          <h2>Gallery</h2>
          {store.selectedTour && !store.isLoading ? (
            <ImageTemplate
              data={store.selectedTour.gallery.map((src, i) => ({
                src,
                alt: `${slug}-image-${i + 1}`,
              }))}
            />
          ) : (
            <div role="status" className="flex animate-pulse w-full">
              <div className="flex grow flex-wrap justify-center w-full">
                {[...Array(9)].map((v, i) => (
                  <svg
                    key={`${slug}-skeleton-img-${i}`}
                    className="mt-1 w-1/3 px-1 h-[350px] text-gray-200 dark:text-gray-600"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18">
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                  </svg>
                ))}
              </div>
            </div>
          )}
        </Row>

        <Row>
          <div>
            <h2>Book This Tour</h2>
            <StyledDivider />
          </div>

          <BookingForm onSubmit={handleSubmit} details={detail} type="tours" />
        </Row>
      </Panel>
      <br />
    </Layout>
  );
}
