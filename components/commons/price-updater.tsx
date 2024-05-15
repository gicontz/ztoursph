import React from "react";

interface Props {
  basePrice: number;
  perPaxPrice: number;
  totalPax?: number;
  minimumPax: number;
}

export const priceCalculator = ({
  basePrice,
  perPaxPrice,
  totalPax = 0,
  minimumPax,
}: Props) => {
  return totalPax > minimumPax
    ? perPaxPrice * (totalPax - minimumPax) + basePrice
    : basePrice;
};

const PriceUpdater: React.FC<Props> = (props) => {
  const { basePrice, perPaxPrice, totalPax, minimumPax } = props;
  console.log(props);
  return (
    <div className="flex space-x-1 flex-wrap justify-between text-sm rounded border border-gray-200 bg-gray-100 p-2">
      <div>
        <p className="italic">The package comes for the price of</p>
        <p>Additional Pax Price</p>
        <p>Total Pax</p>
      </div>

      <div>
        <p className="italic">{minimumPax} pax</p>
        <p>
          {perPaxPrice.toLocaleString("en-US", {
            style: "currency",
            currency: "PHP",
          })}
        </p>
        <p>{totalPax}</p>
      </div>
      <div className="w-full flex font-bold justify-between border-t mt-2 py-2">
        <p className="text-right w-5/6">Total Price</p>

        <p className="text-green-700">
          {priceCalculator({
            basePrice,
            perPaxPrice,
            totalPax,
            minimumPax,
          }).toLocaleString("en-US", { style: "currency", currency: "PHP" })}
        </p>
      </div>
    </div>
  );
};

export default PriceUpdater;
