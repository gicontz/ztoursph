import { Dispatch, useReducer } from "react";
import { Actions, PackagesState, PackagesTypes } from "./types";
import { packages } from "./reducer";
import {
  getPackages as getPackagesApi,
  getPackageBySlug as getPackagesBySlugApi,
} from "@app/services/packages";

const defaultState = {
  isLoading: false,
  packages: [],
  selectedPackage: null,
  totalRecords: 0,
};

export const usePackages = (): [
  PackagesState,
  React.Dispatch<PackagesTypes>
] => {
  const [state, dispatch] = useReducer(packages, defaultState);
  return [state, dispatch];
};

export const getPackages = async (
  dispatch: Dispatch<PackagesTypes>,
  options?: { pageNumber?: number; pageSize?: number; searchText?: string }
) => {
  if (options) {
    const { pageNumber, pageSize, searchText } = options;
    if (pageNumber && pageSize) {
      dispatch({ type: Actions.GET_PACKAGES_START });
      try {
        const { data } = await getPackagesApi({
          pageNumber,
          pageSize,
          searchText,
        });
        dispatch({
          type: Actions.GET_PACKAGES_FULFILLED,
          payload: {
            records: [...data.records],
            totalRecords: data.totalRecords,
          },
        });
      } catch (e) {
        console.log("Error", e);
        dispatch({ type: Actions.GET_PACKAGES_FAILED });
      }
    }
  }
};

export const getPackageBySlug = async (
  dispatch: Dispatch<PackagesTypes>,
  slug: string
) => {
  dispatch({ type: Actions.GET_PACKAGE_INFO_START });
  try {
    const { data } = await getPackagesBySlugApi(slug);
    console.log(data);
    dispatch({
      type: Actions.GET_PACKAGE_INFO_FULFILLED,
      payload: { ...data },
    });
  } catch (e) {
    console.log(e);
    dispatch({ type: Actions.GET_PACKAGE_INFO_FAILED });
  }
};
