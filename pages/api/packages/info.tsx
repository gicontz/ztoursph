import type { NextApiRequest, NextApiResponse } from "next";

const APIUri = process.env.API_SERVER;

const __ = async (req: NextApiRequest, res: NextApiResponse) => {
  const result = await fetch(
    `${APIUri}/packages/info?package_slug=${req.query.package_slug}`,
    { method: "GET" }
  );
  if (result.status !== 200) {
    const error = result.statusText;
    return res
      .status(result.status)
      .json({ status: result.status, message: result.statusText, error });
  }
  const data = await result.json();
  return res.status(result.status).json(data);
};

export default __;
