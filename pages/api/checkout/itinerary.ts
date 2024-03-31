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
    const blob = await result.arrayBuffer();
    res.setHeader('content-type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="itinerary-${new Date().toISOString().replace(/:/g, '-').replace(/\..+/, '')}.pdf"`,
    );
    return res.end(Buffer.from(blob));
};

export default __;
