import { TCreateBooking, TItinerary, TPaymentData, TPreCheckout, TPreCheckoutCalculation } from "@app/modules/checkout/types";
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

const getItinerary = (data: {content: TItinerary}): Promise<any> => {
  const headers = {
    'Content-Type': 'application/json',
  };
  return fetch(`/api/checkout/itinerary`, { method: "POST", body: JSON.stringify(data), headers })
    .then((res) => {
      return res.blob().then((blob) => {
        const blobUrl = URL.createObjectURL(blob);
        
        return ({
          status: res.status,
          data: {
            blobUrl,
          }
        })
      });
    })
    .then((res) => res)
    .catch((err) => console.log(err));
};

const createBooking = (data: TCreateBooking): Promise<any> => {
  const headers = {
    'Content-Type': 'application/json',
  };
  return fetch(`/api/checkout/create-booking`, { method: "POST", body: JSON.stringify(data), headers })
    .then((res) => handleResponse(res))
    .then((res) => res)
    .catch((err) => console.log(err));
};

const getPayments = (data: { paymentData: TPaymentData }): Promise<any> => {
  const headers = {
    'Content-Type': 'application/json',
  };
  return fetch(`/api/checkout/payment`, { method: "POST", body: JSON.stringify(data), headers })
    .then((res) => handleResponse(res))
    .then((res) => res)
    .catch((err) => console.log(err));
};

export { calculateTrips, getItinerary, createBooking, getPayments };
