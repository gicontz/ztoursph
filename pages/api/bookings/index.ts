import type { NextApiRequest, NextApiResponse } from "next";

const APIUri = process.env.API_SERVER;

const __ = async (req: NextApiRequest, res: NextApiResponse) => {
  let query = '';
  const userEmail = req.query.userEmail;
  const result = await fetch(`${APIUri}/bookings?userEmail=${userEmail}`, { method: "GET" });
  if (result.status !== 200) {
    const error = result.statusText;
    return res
      .status(result.status)
      .json({ status: result.status, message: result.statusText, error });
  }
  const data = await result.json();
  return res.json({
    status: result.status,
    data: data.data,
  });
};

export default __;
