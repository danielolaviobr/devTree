import prisma from "@utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const users = await prisma.user.findMany({ include: { sites: true } });
  res.status(200).json(users);
};
