import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@utils/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id, currentNumberOfAccesses } = req.body;
    const site = await prisma.site.update({
      where: { id },
      data: { numberOfAccesses: currentNumberOfAccesses + 1 },
    });
    return res.status(200).json({ site });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
