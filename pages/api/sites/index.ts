import prisma from "@utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const sites = await prisma.site.findMany();
  return res.status(200).json({ sites });
};
