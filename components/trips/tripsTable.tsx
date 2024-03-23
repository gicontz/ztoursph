import styled from "@emotion/styled";
import React from "react";
import { Row, StyledDivider } from "@components/commons/common";
import Button from "@components/commons/button";
import PackageCard from "./packageCard";
import { Source_Serif_4 } from "next/font/google";

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

interface TripsTableProps {
  data: {
    title: string;
    imageUrl: string | { src: string };
    date: string;
    pickup: string;
    price: number;
    numberOfTraveller: number;
  }[];
}

const TripsTable: React.FC<TripsTableProps> = ({ data }) => {
  const [open, setIsOpen] = React.useState(false);

  const CheckoutDetailModal = () => {
    setIsOpen(true)
  };

  console.log(data)

  const content = data.map((e, i) => (
    <PackageCard
      key={`package-${i}`}
      image={e.imageUrl}
      title={e.title}
      pax={e.numberOfTraveller}
      date={e.date}
      pickup={e.pickup}
      price={e.price}
      onUpdatePrice={(number: number) => console.log(number)}
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
        {content}
      </TableContainer>

      <CheckoutSection>
        <div className="flex-col flex gap-3">
          <div className="w-[17rem]">
            <h2 className="tour--total">Trips Total</h2>
            <Divider />
            <div className="flex justify-between">
              <h2 className="">Subtotal</h2>
              <h2 className="font-normal text-right">₱{3000}</h2>
            </div>
            <Divider />
            <div className="flex justify-between ">
              <h2 className="w-fit">Total</h2>
              <h2 className="w-fit text-right">₱{3000}</h2>
            </div>
          </div>
          <StyledButton
            type="primary"
            className={`w-full ${SourceSerif.className}`}
            onClick={CheckoutDetailModal}>
            Proceed Checkout
          </StyledButton>
        </div>
      </CheckoutSection>
    </Panel>
  );
};

export default TripsTable;
