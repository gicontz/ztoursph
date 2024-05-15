import { Action } from "@app/types/Action";

export enum Actions {
  GET_PACKAGES_START = "@packages/GET_PACKAGES_START",
  GET_PACKAGES_FULFILLED = "@packages/GET_PACKAGES_FULFILLED",
  GET_PACKAGES_FAILED = "@packages/GET_PACKAGES_FAILED",
  GET_PACKAGE_INFO_START = "@packages/GET_PACKAGE_INFO_START",
  GET_PACKAGE_INFO_FULFILLED = "@packages/GET_PACKAGE_INFO_FULFILLED",
  GET_PACKAGE_INFO_FAILED = "@packages/GET_PACKAGE_INFO_FAILED",
}

export type TPackageResponse = {
  id: number;
  package_slug: string;
  package_title: string;
  package_banner_image: string;
  package_details: string;
  thumbnail: string;
  price: number;
  discount: number;
  gallery: string[];
  per_pax_price: number;
  min_pax: number;
};

export type TPackagesResponse = {
  id: number;
  package_slug: string;
  package_title: string;
  package_details: string;
  price: number;
  discount: number;
  thumbnail: string;
  package_banner_image: string;
  location: string;
  reviews: number;
  numberReviews: number;
  gallery: string[];
};

export interface PackagesState {
  isLoading?: boolean;
  selectedPackage: TPackageResponse | null;
  packages: TPackagesResponse[];
  totalRecords: number;
}

export type GetPackagesRequest = Action<typeof Actions.GET_PACKAGES_START>;
export type GetPackagesAction = Action<
  typeof Actions.GET_PACKAGES_FULFILLED,
  { records: TPackagesResponse[]; totalRecords: number }
>;
export type GetPackagesFailed = Action<typeof Actions.GET_PACKAGES_FAILED>;

export type GetPackageInfoRequest = Action<
  typeof Actions.GET_PACKAGE_INFO_START
>;
export type GetPackageInfoAction = Action<
  typeof Actions.GET_PACKAGE_INFO_FULFILLED,
  TPackageResponse
>;
export type GetPackageInfoFailed = Action<
  typeof Actions.GET_PACKAGE_INFO_FAILED
>;

export type PackagesTypes =
  | GetPackagesRequest
  | GetPackagesAction
  | GetPackagesFailed
  | GetPackageInfoRequest
  | GetPackageInfoAction
  | GetPackageInfoFailed;
