import { handleResponse } from "@app/utils/helpers";

const getBookingInfo = (
  id?: string,
  options?: { email: string; reference_id: string }
): Promise<any> => {
  let fetchUri = `/api/confirmation/booking`;
  if (typeof id === "string") fetchUri = fetchUri + `?id=${id}`;
  else if (options)
    fetchUri =
      fetchUri + `?email=${options.email}&reference_id=${options.reference_id}`;

  return fetch(fetchUri, { method: "GET" })
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
};

export { getBookingInfo, getUserBookings };
