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
import { PAYMENT_REDIRECT } from "@constants/nav";

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
  console.log(router.query.id);
  const bookingId: string =
    (router.query.id as string) ??
    (typeof localStorage !== "undefined" &&
      localStorage.getItem(LOCAL_STORAGE.bookingId));
      console.log(bookingId)
  const { data, isLoading } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBookingInfo(bookingId),
  });

  const paymentStatus = data?.data?.paymentStatus;
  const mainGuest = data?.data?.mainGuest;
  const bookingDetails = data?.data;

  const redirectUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${PAYMENT_REDIRECT}`
      : "";

  const processPayment = (d: { data: { redirectUrl: string } }) => {
    window.location.href = d.data.redirectUrl;
  };

  const handlePay = () => {
    mutatePayment({
      paymentData: {
        bookingId: bookingDetails.id,
        amount: bookingDetails.total_amt,
        userId: mainGuest.id,
        status: "PENDING",
        paymentType: "CREDIT CARD",
        redirectUrl: {
          success: redirectUrl,
          failure: redirectUrl,
          cancel: redirectUrl,
        },
      },
    });
  };

  const { mutate: mutatePayment, isPending: preparePaymentLoading } =
    useMutation({
      mutationKey: ["payNow"],
      mutationFn: (param: { paymentData: TPaymentData }) => getPayments(param),
      onSuccess: (d) => processPayment(d),
    });

  return (
    <Layout>
      <PageTitle title="Booking Confirmation" bgImage={BannerImage} />
      {isLoading ? (
        <Loading />
      ) : data?.data ? (
        <div className="p-8 w-full max-w-[1400px] mx-auto">
          <Breadcrumb items={breadCrumbItems} />
          <div className="flex justify-between my-5">
            <div className="flex flex-col">
              <h2
                className={classNames(
                  "text-2xl font-bold",
                  paymentStatus === "UNPAID"
                    ? "text-red-700"
                    : paymentStatus === "PAID"
                    ? "text-green-700"
                    : "text-yellow-600"
                )}
              >
                {paymentStatus}
              </h2>
              <h4>
                {parseInt(bookingDetails.total_amt, 10).toLocaleString(
                  "en-US",
                  { style: "currency", currency: "PHP" }
                )}
              </h4>
              <h4 className="text-lg">
                Booking Reference:&nbsp;
                <span className="font-bold">
                  {bookingDetails.reference_id.toUpperCase()}
                </span>
              </h4>
              <h4 className="text-gray-500">
                Booking Date:{" "}
                {format(bookingDetails.created_date, "MMM dd, yyyy")}
              </h4>
              {paymentStatus !== "PAID" && paymentStatus !== "CANCELED" && (
                <Button
                  type="primary"
                  onClick={handlePay}
                  loading={preparePaymentLoading}
                >
                  PAY NOW
                </Button>
              )}
            </div>
            <div className="flex flex-col justify-center text-center">
              <QRCode
                value={`${typeof window !== "undefined" ? window.location.href : ""}/?id=${bookingDetails.id}`}
              />
              <h4 className="text-lg font-bold mt-3">
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
          </div>
          <iframe
          src={`${bookingDetails.itineraryUri}`}
          className="w-full my-3 h-[800px]"
          />
        </div>
      ) : (
        <div className="p-8 w-full max-w-[1400px] mx-auto">
          <h2>Booking not found</h2>
        </div>
      )}
    </Layout>
  );
}
