import { handleResponse } from "@app/utils/helpers";

const getBookingInfo = (id: string): Promise<any> => {
    return fetch(`/api/confirmation/booking?id=${id}`, { method: "GET" })
      .then((res) => handleResponse(res))
      .then((res) => res)
      .catch((err) => console.log(err));
};
  
export { getBookingInfo };