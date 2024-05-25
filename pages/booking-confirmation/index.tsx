import PageTitle from "@components/pages/page-title";
import React, { useEffect, useState } from "react";
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
import { PDFFile } from "@app/layouts/pdfs/booking";
import dynamic from "next/dynamic";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

const BookingPdf = dynamic(() => import("@app/layouts/pdfs/booking"), {
  ssr: false,
});

export const getStaticProps = () => {
  const domain = process.env.DOMAIN;
  return {
    props: {
      domain,
    },
  };
};

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

export default function BookingConfirmation({ domain }) {
  const [file, setFile] = useState<PDFFile>(null);
  const router = useRouter();

  const bookingId: string =
    (router.query.id as string) ??
    (typeof localStorage !== "undefined" &&
      localStorage.getItem(LOCAL_STORAGE.bookingId));

  const reference_id: string = router.query.reference_id as string;
  const email: string =
    (router.query.email as string) ??
    (typeof localStorage !== "undefined" &&
      localStorage.getItem(LOCAL_STORAGE.email));

  const { data, isLoading } = useQuery({
    queryKey: ["booking", bookingId, { email, reference_id }],
    queryFn: () => getBookingInfo(bookingId, { email, reference_id }),
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

  useEffect(() => {
    if (data && data.data?.itineraryUri) {
      setFile(data.data?.itineraryUri);
    }
  }, [data]);

  return (
    <Layout>
      <PageTitle title="Booking Confirmation" bgImage={BannerImage} />
      {isLoading ? (
        <Loading />
      ) : data?.data ? (
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
              <a
                className="mt-2"
                href={file as string}
                target="_blank"
                download="itinerary.pdf"
              >
                <Button type="primary" className="w-full">
                  Download Itinerary
                </Button>
              </a>
            </div>
            <div className="flex flex-col justify-center text-center">
              <QRCode
                className="mx-auto lg:mx-0"
                value={`${domain}${AppRoutes.BOOKING_CONFIRMATION}?reference_id=${reference_id}&email=${email}`}
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

          <BookingPdf file={file} />
        </div>
      ) : (
        <div className="p-8 w-full max-w-[1400px] mx-auto">
          <h2>Booking not found</h2>
        </div>
      )}
    </Layout>
  );
}
