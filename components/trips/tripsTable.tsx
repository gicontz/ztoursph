import styled from "@emotion/styled";
import React, { useCallback, useEffect, useMemo } from "react";
import { Row, StyledDivider } from "@components/commons/common";
import Button from "@components/commons/button";
import PackageCard from "./packageCard";
import { Source_Serif_4 } from "next/font/google";
import Loading from "@components/commons/loading";
import { calculateTrips } from "@app/services/checkout";
import {
  TPreCheckout,
  TPreCheckoutCalculation,
} from "@app/modules/checkout/types";
import { useTours } from "@app/modules/tours/actions";
import {
  removeToTrips,
  setLoading,
  setPaxToTrips,
} from "@app/modules/trips/actions";
import { useTripsContext } from "@providers/trips";
import { set } from "lodash";
import { useRouter } from "next/router";
import { Added_Trips } from "@constants/added_trips";
import { useCookies } from "react-cookie";
import { useDialog } from "@providers/dialog";
import ConfirmationDialog from "@app/layouts/modals/ConfirmationDialog";
import DataPrivacyPopup from "./data-privacy";

const SourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["500"],
});

const Panel = styled(Row)`
  margin: auto;
  h2 {
    width: 100%;
    color: #23432c;
    font-size: 1.3rem;
  }
`;

const Divider = styled(StyledDivider)`
  margin: 5px 0;
`;

const CheckoutSection = styled.div`
  width: 100%;
  margin: 2.5rem 0 0 0;
  display: flex;
  justify-content: end;
  h2 {
    font-weight: 400;
  }

  .tour--total {
    font-weight: 600;
  }
`;

const StyledButton = styled(Button)`
  width: 100%;
  height: 2.5rem;
  font-size: 1.1rem;
`;
export type TData = {
  tripId: string | number;
  title: string;
  imageUrl: string | { src: string };
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

  const CheckoutDetailModal = () => {
    route.push("/trips/checkout");
  };

  const DataPrivacyPopUp = () => {
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
        const newCookieData = cookies[Added_Trips].map((e) => ({
          ...e,
          numberOfTraveller:
            d.subTotals.find((s) => s.id === e.tripId)?.pax ??
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

  const handleRemove = (id: string | number) => {
    setCheckoutData((prev) => {
      const removedList = prev.filter((e) => e.tripId !== id);
      const newData = {
        booking: removedList.map((e) => ({
          id: e.tripId,
          pax: e.numberOfTraveller,
          ages: e.ages,
        })),
      };
      setCookie(
        Added_Trips,
        cookies[Added_Trips].filter((e) => e.tripId !== id)
      );
      removeToTrips(tripDispatch, id);
      handleCalc(newData);
      return removedList;
    });
  };

  const Trips = () =>
    checkoutData.map((e, i) => (
      <PackageCard
        key={`package-${i}`}
        image={e.imageUrl}
        title={e.title}
        pax={
          checkoutDetails?.subTotals.find((s) => s.id === e.tripId)?.pax ??
          e.numberOfTraveller
        }
        date={e.date}
        pickup={e.pickup}
        // discount={e.discount}
        subTotal={
          checkoutDetails?.subTotals.find((s) => s.id === e.tripId)?.subTotal ??
          0
        }
        price={e.price}
        onRemove={() => handleRemove(e.tripId)}
      />
    ));

  console.log(checkoutDetails);

  return (
    <Panel>
      <div className="flex flex-col px-4">
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

      <CheckoutSection>
        <div className="flex-col flex gap-3 p-2">
          {isLoading ? (
            <Loading />
          ) : (
            <div className="w-full">
              <h4 className="tour--total">Trips Total</h4>
              <Divider />
              <div className="flex justify-between">
                <h4 className="">Subtotal</h4>
                <h4 className="font-normal text-right">
                  ₱ {checkoutDetails?.totalAmt ?? 0}
                </h4>
              </div>
              <Divider />
              <div className="flex justify-between ">
                <h4 className="w-fit">Convenience Fee</h4>
                <h4 className="w-fit text-right">
                  ₱ {checkoutDetails?.processingFee ?? 0}
                </h4>
              </div>
              <Divider />
              <div className="flex justify-between ">
                <h4 className="w-fit">Total</h4>
                <h4 className="w-fit text-right">
                  ₱ {checkoutDetails?.totalAmtTbp ?? 0}
                </h4>
              </div>
            </div>
          )}
          <StyledButton
            type="primary"
            className={`w-full ${SourceSerif.className}`}
            disabled={checkoutDetails === null}
            onClick={DataPrivacyPopUp}>
            Proceed Checkout
          </StyledButton>
        </div>
      </CheckoutSection>
    </Panel>
  );
};

export default TripsTable;
