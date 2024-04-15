import PageTitle from "@components/pages/page-title";
import React from "react";
import BannerImage from "@assets/images/banner.jpg";
import Layout from "@components/pages/layout";
import { useQuery } from "@tanstack/react-query";
import { getBookingInfo } from "@app/services/booking";
import Loading from "@components/commons/loading";
import Barcode from "react-barcode";
import { format } from "date-fns";
import { classNames } from "@app/utils/helpers";
import Button from "@components/commons/button";

export default function BookingConfirmation() {
  // const bookingId = '05b915f4-fd5d-41f9-8ef7-5c392629f4ca'; // UNPAID
  const bookingId = "3806df56-a9b4-4acd-943a-aad4658888c9"; // PAID
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
          <div className="flex items-center justify-between">
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
                Booking Reference:{" "}
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
              <Barcode value={data.data.reference_id} displayValue={false} />
              <h4 className="text-base font-bold">
                {data.data.reference_id.toUpperCase()}
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
        </div>
      )}
    </Layout>
  );
}
