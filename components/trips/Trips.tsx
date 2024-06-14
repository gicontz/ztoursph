import styled from "@emotion/styled";
import React, { useCallback, useEffect, useMemo } from "react";
import Button from "@components/commons/button";
import PackageRow from "./PackageRow";
import Loading from "@components/commons/loading";
import { calculateTrips } from "@app/services/checkout";
import {
  TPreCheckout,
  TPreCheckoutCalculation,
} from "@app/modules/checkout/types";
import { removeToTrips, setLoading } from "@app/modules/trips/actions";
import { useTripsContext } from "@providers/trips";
import { set } from "lodash";
import { useRouter } from "next/router";
import { Added_Trips } from "@constants/added_trips";
import { useCookies } from "react-cookie";
import { useDialog } from "@providers/dialog";
import DataPrivacyPopup from "./data-privacy";

export type TData = {
  tripId: string | number;
  title: string;
  imageUrl: string;
  date: string;
  pickup: string;
  price: number;
  discount: number;
  numberOfTraveller: number;
  ages: number[];
};

interface TripsTableProps {
  data: TData[];
  isLoading?: boolean;
}

const TripsTable: React.FC<TripsTableProps> = ({ data, isLoading }) => {
  const route = useRouter();
  const { tripDispatch } = useTripsContext();
  const [cookies, setCookie] = useCookies([Added_Trips]);
  const [openDataPrivacy, closeDataPrivacy] = useDialog();
  const [checkoutData, setCheckoutData] = React.useState<TData[]>(data);
  const [checkoutDetails, setCheckoutDetails] =
    React.useState<TPreCheckoutCalculation | null>(null);

  const handleCheckout = () => {
    if (localStorage.getItem("signature")) {
      route.push("/trips/checkout");
      return;
    }
    openDataPrivacy({
      children: <DataPrivacyPopup onCloseItself={() => closeDataPrivacy()} />,
    });
  };

  useEffect(() => {
    setCheckoutData(data);
    handleCalc();
  }, [data]);

  const handleCalc = async (newData?: TPreCheckout) => {
    try {
      const calculations = await checkoutCalculations(newData);
      const { data: d } = calculations;
      if (d) {
        setCheckoutDetails(d);
        const newCookieData = cookies[Added_Trips].map((e, i) => ({
          ...e,
          numberOfTraveller:
            d.subTotals.find((_, idx) => i === idx)?.pax ??
            e.numberOfTraveller,
        }));
        setCookie(Added_Trips, newCookieData);
      } else {
        setCheckoutDetails(null);
      }
    } catch (e) {
      return;
    }
  };

  const checkoutCalculations = useCallback(
    async (newData?: TPreCheckout) => {
      const baseData = newData?.booking;
      setLoading(tripDispatch, true);
      const calculations = await calculateTrips({
        booking:
          baseData ??
          checkoutData.map((e) => ({
            id: e.tripId,
            pax: e.numberOfTraveller,
            ages: e.ages,
          })),
      });
      setLoading(tripDispatch, false);
      return calculations;
    },
    [data]
  );

  const handleRemove = (indx: number) => {
    setCheckoutData((prev) => {
      const removedList = prev.filter((e, i) => i !== indx);
      const newData = {
        booking: removedList.map((e) => ({
          id: e.tripId,
          pax: e.numberOfTraveller,
          ages: e.ages,
        })),
      };
      setCookie(
        Added_Trips,
        cookies[Added_Trips].filter((e, i) => i !== indx)
      );
      removeToTrips(tripDispatch, indx);
      handleCalc(newData);
      return removedList;
    });
  };

  const Trips = () =>
    checkoutData.map((e, i) => (
      <PackageRow
        key={`package-${i}`}
        image={e.imageUrl}
        title={e.title}
        pax={
          checkoutDetails?.subTotals.find((_, idx) => i === idx)?.pax ??
          e.numberOfTraveller
        }
        date={e.date}
        pickup={e.pickup}
        // discount={e.discount}
        subTotal={
          checkoutDetails?.subTotals.find((_, idx) => i === idx)?.subTotal ?? 0
        }
        price={e.price}
        onRemove={() => handleRemove(i)}
      />
    ));

  return (
    <div>
      <div className="flex flex-col">
        <div className="flex text-center bg-gray-50 p-2 w-full [&>h4]:text-sm [&>h4]:w-1/4 mb-4">
          <h4>Trips</h4>
          <h4>Price</h4>
          <h4>Pax</h4>
          <h4>Subtotal</h4>
        </div>
        {isLoading ? (
          <Loading />
        ) : checkoutData.length > 0 ? (
          <Trips />
        ) : (
          <h2>No trips added</h2>
        )}
      </div>

      <div className="w-full max-w-[350px] ml-auto">
        <div className="flex-col flex gap-3 p-2">
          {isLoading ? (
            <Loading />
          ) : (
            <div className="w-full">
              <h4 className="tour--total font-bold">Trips Total</h4>
              <hr />
              <div className="flex justify-between">
                <h4 className="">Subtotal</h4>
                <h4 className="font-normal text-right">
                  ₱ {checkoutDetails?.totalAmt ?? 0}
                </h4>
              </div>
              <hr />
              <div className="flex justify-between ">
                <h4 className="w-fit">Convenience Fee</h4>
                <h4 className="w-fit text-right">
                  ₱ {checkoutDetails?.processingFee ?? 0}
                </h4>
              </div>
              <hr />
              <div className="flex justify-between ">
                <h4 className="w-fit">Total</h4>
                <h4 className="w-fit text-right">
                  ₱ {checkoutDetails?.totalAmtTbp ?? 0}
                </h4>
              </div>
            </div>
          )}
          <Button
            type="primary"
            className={`w-full`}
            disabled={checkoutDetails === null}
            onClick={handleCheckout}
          >
            Proceed Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TripsTable;
