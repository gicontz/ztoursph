import styled from "@emotion/styled";
import React, { useCallback, useEffect, useMemo } from "react";
import { Row, StyledDivider } from "@components/commons/common";
import Button from "@components/commons/button";
import PackageCard from "./packageCard";
import { Source_Serif_4 } from "next/font/google";
import Loading from "@components/commons/loading";
import { calculateTrips } from "@app/services/checkout";
import { TPreCheckout, TPreCheckoutCalculation } from "@app/modules/checkout/types";
import { useTours } from "@app/modules/tours/actions";
import { setLoading } from "@app/modules/trips/actions";
import { useTripsContext } from "@providers/trips";
import { set } from "lodash";
import { useRouter } from "next/router";
import { Added_Trips } from "@constants/added_trips";
import { useCookies } from "react-cookie";

const SourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["500"],
});

const Panel = styled(Row)`
  * {
    // border: 1px solid blue;
  }
  width: 60rem;
  margin: auto;
  h2 {
    width: 100%;
    color: #23432c;
    font-size: 1.3rem;
  }
`;

const TableContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-rows: repeat(2, fit-content);
  gap: 0.5rem;
  margin: auto;
`;

const Column = styled.div`
  display: grid;
  text-align: center;
  grid-template-columns: repeat(5, 1fr);
  background-color: #efefef;
  padding: 0.3rem;

  .expand {
    grid-column: span 2;
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
  numberOfTraveller: number;
};

interface TripsTableProps {
  data: TData[];
  isLoading?: boolean;
}

const TripsTable: React.FC<TripsTableProps> = ({ data, isLoading }) => {
  const route = useRouter();
  const { tripDispatch } = useTripsContext();
  const [cookies, setCookie] = useCookies([Added_Trips]);
  const [checkoutData, setCheckoutData] = React.useState<TData[]>(data);
  const [checkoutDetails, setCheckoutDetails] = React.useState<TPreCheckoutCalculation | null>(null);

  const CheckoutDetailModal = () => {
    route.push("/trips/checkout");
  };

  useEffect(() => {
    setCheckoutData(data);
    handleCalc();
  }, [data]);

  console.log(cookies);

  const handleCalc = async (newData?: TPreCheckout) => {
    try {
      const calculations = await checkoutCalculations(newData);
      const { data: d} = calculations;
      if (d) {
        setCheckoutDetails(d);
        setCookie(Added_Trips, cookies[Added_Trips].map((e) => ({ ...e, numberOfTraveller: d.subTotals.find((s) => s.id === e.tripId)?.pax ?? e.numberOfTraveller })));
      }
    } catch (e) {
      return;
    }
  }

  const checkoutCalculations = useCallback(async (newData?: TPreCheckout) => {
    const baseData = newData?.booking;
    setLoading(tripDispatch, true);
    const calculations = await calculateTrips({ booking: baseData ?? checkoutData.map((e) => ({ id: e.tripId, pax: e.numberOfTraveller })) });
    setLoading(tripDispatch, false);
    return calculations;
  }, [data]);

  const handleUpdatePax = (id: string | number) => (newPax: number) => {
    const newData = {
      booking: checkoutData.map((e) => ({ id: e.tripId, pax: e.numberOfTraveller }))
    };
    newData.booking.find((e) => e.id === id)!.pax = newPax;
    setCheckoutData(prev => prev.map((e) => ({ ...e, numberOfTraveller: e.tripId === id ? newPax : e.numberOfTraveller })));
    handleCalc(newData);
  };

  const Trips = () => checkoutData.map((e, i) => (
    <PackageCard
      key={`package-${i}`}
      image={e.imageUrl}
      title={e.title}
      pax={checkoutDetails?.subTotals.find((s) => s.id === e.tripId)?.pax ?? e.numberOfTraveller}
      date={e.date}
      pickup={e.pickup}
      price={e.price}
      onUpdatePrice={handleUpdatePax(e.tripId)}
    />
  ));

  return (
    <Panel>
      <TableContainer>
        <Column>
          <h2 className="expand">Trips</h2>
          <h2>Price</h2>
          <h2>Pax</h2>
          <h2>Subtotal</h2>
        </Column>
        { isLoading ? <Loading /> : checkoutData.length > 0 ? <Trips /> : <h2>No trips added</h2>}
      </TableContainer>

      <CheckoutSection>
        <div className="flex-col flex gap-3">
          {
            (isLoading && !checkoutDetails) ? (
              <Loading />
            ) : (
                <div className="w-full">
                  <h2 className="tour--total">Trips Total</h2>
                  <Divider />
                  <div className="flex justify-between">
                    <h2 className="">Subtotal</h2>
                    <h2 className="font-normal text-right">₱ {checkoutDetails?.totalAmt ?? 0}</h2>
                  </div>
                  <Divider />
                  <div className="flex justify-between ">
                    <h2 className="w-fit">Convenience Fee</h2>
                    <h2 className="w-fit text-right">₱ {checkoutDetails?.processingFee ?? 0}</h2>
                  </div>
                  <Divider />
                  <div className="flex justify-between ">
                    <h2 className="w-fit">Total</h2>
                    <h2 className="w-fit text-right">₱ {checkoutDetails?.totalAmtTbp ?? 0}</h2>
                  </div>
                </div>
            )
          }
          <StyledButton
            type="primary"
            className={`w-full ${SourceSerif.className}`}
            disabled={checkoutDetails === null}
            onClick={CheckoutDetailModal}>
            Proceed Checkout
          </StyledButton>
        </div>
      </CheckoutSection>
    </Panel>
  );
};

export default TripsTable;
