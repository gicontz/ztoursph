import { handleResponse } from "@app/utils/helpers";

const getPackages = (options?: {
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
  return fetch(`/api/packages${query}`, { method: "GET" })
    .then((res) => handleResponse(res))
    .then((res) => res)
    .catch((err) => console.log(err));
};

const getPackageBySlug = (slug) => {
  return fetch(`/api/packages/info?package_slug=${slug}`, { method: "GET" })
    .then((res) => handleResponse(res))
    .then((res) => res)
    .catch((err) => console.log(err));
};

export { getPackages, getPackageBySlug };
