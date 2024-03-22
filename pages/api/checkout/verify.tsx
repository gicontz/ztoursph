import type { NextApiRequest, NextApiResponse } from "next";

const APIUri = process.env.API_SERVER;

const __ = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(APIUri)
  const result = await fetch(
    `${APIUri}/checkout/verify`,
    { method: "post", body: req.body }
  );
  if (result.status !== 200) {
    const error = result.statusText;
    return res
      .status(result.status)
      .json({ status: result.status, message: result.statusText, error });
  }
  const data = await result.json();
  return res.status(200).json(data);
};

export default __;
