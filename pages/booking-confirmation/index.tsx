import PageTitle from "@components/pages/page-title";
import React from "react";
import BannerImage from "@assets/images/banner.jpg";
import Layout from "@components/pages/layout";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getBookingInfo } from "@app/services/booking";
import Loading from "@components/commons/loading";
import QRCode from "react-qr-code";
import { format } from "date-fns";
import { classNames } from "@app/utils/helpers";
import Button from "@components/commons/button";
import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import Link from "next/link";
import LOCAL_STORAGE from "@constants/localstorage";
import { useRouter } from "next/router";
import { getPayments } from "@app/services/checkout";
import { TPaymentData } from "@app/modules/checkout/types";
import { AppRoutes, PAYMENT_REDIRECT } from "@constants/nav";

const breadCrumbItems = [
  {
    title: (
      <Link href="/">
        <HomeOutlined />
      </Link>
    ),
  },
  {
    title: <Link href="/my-bookings">My Bookings</Link>,
  },
  {
    title: "Booking Confirmation",
  },
];

export default function BookingConfirmation() {
  const router = useRouter();
  const bookingId: string =
    (router.query.id as string) ??
    (typeof localStorage !== "undefined" &&
      localStorage.getItem(LOCAL_STORAGE.bookingId));
  const { data, isLoading } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBookingInfo(bookingId),
  });

  const paymentStatus = data?.data?.paymentStatus;
  const mainGuest = data?.data?.mainGuest;

  return (
    <Layout>
      <PageTitle title="Booking Confirmation" bgImage={BannerImage} />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="p-8 w-full max-w-[1400px] mx-auto">
          <Breadcrumb items={breadCrumbItems} />
          <div className="flex justify-between my-5 text-center flex-col-reverse flex-col lg:flex-row lg:text-left">
            <div className="flex flex-col">
              <h2
                className={classNames(
                  "text-2xl font-bold",
                  paymentStatus === "UNPAID"
                    ? "text-red-700"
                    : paymentStatus === "PAID"
                    ? "text-green-700"
                    : "text-yellow-600"
                )}>
                {paymentStatus}
              </h2>
              <h4>
                {parseInt(bookingDetails.total_amt, 10).toLocaleString(
                  "en-US",
                  { style: "currency", currency: "PHP" }
                )}
              </h4>
              <h4>
                Booking Reference:&nbsp;
                <span className="font-bold">
                  {data.data.reference_id.toUpperCase()}
                </span>
              </h4>
              <h4 className="text-gray-500">
                Booking Date: {format(data.data.created_date, "MMM dd, yyyy")}
              </h4>
              {paymentStatus !== "PAID" && (
                <Button type="primary">PAY NOW</Button>
              )}
            </div>
            <div className="flex flex-col justify-center text-center">
              <QRCode
                className="mx-auto lg:mx-0"
                value={`${
                  typeof window !== "undefined" ? window.location.origin : ""
                }${AppRoutes.BOOKING_CONFIRMATION}?id=${bookingDetails.id}`}
              />
              <h4 className="text-base font-bold">
                {bookingDetails.reference_id.toUpperCase()}
              </h4>
            </div>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-2">Main Guest Information</h4>
            <div className="flex flex-col">
              <p className="text-base">
                Name: {mainGuest.first_name} {mainGuest.last_name},{" "}
                <strong>
                  <em>{mainGuest.sex}</em>
                </strong>
              </p>
              <p className="text-base">Nationality: {mainGuest.nationality}</p>
              <p className="text-base">Email: {mainGuest.email}</p>
              <p className="text-base">
                Contact Number: {mainGuest.mobile_number1}
              </p>
            </div>
            <iframe
              src={`${data.bookingDetails.itineraryUri}`}
              className="w-full my-3 h-[800px]"
            />
          </div>
        </div>
      )}
    </Layout>
  );
}
