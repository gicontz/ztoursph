import { TPreCheckout, TPreCheckoutCalculation } from "@app/modules/checkout/types";
import { handleResponse } from "@app/utils/helpers";

const calculateTrips = (data: TPreCheckout): Promise<{ data: TPreCheckoutCalculation }> => {
  const headers = {
    'Content-Type': 'application/json',
  };
  return fetch(`/api/checkout/calculate`, { method: "POST", body: JSON.stringify(data), headers })
    .then((res) => handleResponse(res))
    .then((res) => res)
    .catch((err) => console.log(err));
};

export { calculateTrips };
