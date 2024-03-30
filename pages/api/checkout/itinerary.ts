import type { NextApiRequest, NextApiResponse } from "next";

const APIUri = process.env.API_SERVER;

const __ = async (req: NextApiRequest, res: NextApiResponse) => {
  const headers = {
    'Content-Type': 'application/json',
  }
  const result = await fetch(
    `${APIUri}/itinerary`,
    { method: "POST", body: JSON.stringify(req.body), headers }
  );
  
    if (result.status !== 201) {
        const error = result.statusText;
        return res
            .status(result.status)
            .json({ status: result.status, message: result.statusText, error });
    }
    const blob = await result.blob();
    res.setHeader('Content-Disposition', 'attachment; filename=itinerary.pdf');
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Length', blob.size.toString())
    res.setHeader('Content-Encoding', '')
    return res.status(201).send(blob);
};

export default __;
