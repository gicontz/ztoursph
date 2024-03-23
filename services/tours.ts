import { handleResponse } from "@app/utils/helpers";

const getTours = (options?: {
  pageNumber?: number;
  pageSize?: number;
  searchText?: string;
}) => {
  let query = "";
  if (options) {
    const { pageNumber, pageSize, searchText } = options;
    const search = searchText ? `&searchText=${searchText}` : "";
    query = `?pageNumber=${pageNumber}&pageSize=${pageSize}${search}`;
  }
  return fetch(`/api/tours${query}`, { method: "GET" })
    .then((res) => handleResponse(res))
    .then((res) => res)
    .catch((err) => console.log(err));
};

const getTourBySlug = (slug) => {
  return fetch(`/api/tours/info?tour_slug=${slug}`, { method: "GET" })
    .then((res) => handleResponse(res))
    .then((res) => res)
    .catch((err) => console.log(err));
};

const getTrips = (ids: Array<string | number>) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  return fetch(`/api/tours/trips`, { method: "POST", body: JSON.stringify({ ids }), headers })
    .then((res) => handleResponse(res))
    .then((res) => res)
    .catch((err) => console.log(err));
};

export { getTours, getTourBySlug, getTrips };
