import type { NextApiRequest, NextApiResponse } from "next";

const APIUri = process.env.API_SERVER;

const __ = async (req: NextApiRequest, res: NextApiResponse) => {
  let query = "";
  const options = req.query;
  if (options) {
    const { pageNumber, pageSize, searchText } = options;
    const search = searchText ? `&searchText=${searchText}` : "";
    query = `?pageNumber=${pageNumber}&pageSize=${pageSize}${search}`;
  }
  const result = await fetch(`${APIUri}/packages${query}`, { method: "GET" });
  if (result.status !== 200) {
    const error = result.statusText;
    return res
      .status(result.status)
      .json({ status: result.status, message: result.statusText, error });
  }
  const data = await result.json();
  return res.json({
    status: result.status,
    records: data.data.records,
    totalRecords: data.data.totalRecords,
  });
};

export default __;
