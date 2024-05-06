import { handleResponse } from "@app/utils/helpers";

const getBookingInfo = (id: string): Promise<any> => {
    return fetch(`/api/confirmation/booking?id=${id}`, { method: "GET" })
      .then((res) => handleResponse(res))
      .then((res) => res)
      .catch((err) => console.log(err));
};

const getUserBookings = (userEmail: string | null): Promise<any> => {
    if (!userEmail) return Promise.reject([]);
    return fetch(`/api/bookings?userEmail=${userEmail}`, { method: "GET" })
      .then((res) => handleResponse(res))
      .then((res) => res)
      .catch((err) => console.log(err));
}
  
export { getBookingInfo, getUserBookings };