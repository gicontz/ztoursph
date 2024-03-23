import type { NextApiRequest, NextApiResponse } from "next";

const APIUri = process.env.API_SERVER;

const __ = async (req: NextApiRequest, res: NextApiResponse) => {
  const headers = {
    'Content-Type': 'application/json',
  }
  const result = await fetch(
    `${APIUri}/tours/trips`,
    { method: "POST", body: JSON.stringify(req.body), headers }
  );
  console.log(`${APIUri}/tours/trips`, req.body, result.status, result.statusText);
  if (result.status !== 201) {
    const error = result.statusText;
    return res
      .status(result.status)
      .json({ status: result.status, message: result.statusText, error });
  }
  const data = await result.json();
  return res.status(result.status).json(data);
};

export default __;
