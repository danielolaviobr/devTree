import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@prisma/client";
import prisma from "@utils/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userId } = req.query as { [key: string]: string };
    if (!userId) {
      throw new Error();
    }
    const sites = await prisma.site.findMany({
      where: { userId: userId },
      include: { user: true },
    });

    let userData: User;

    const sitesWithoutUserId = sites.map((site) => {
      const { user, userId, ...siteWithoutUserId } = site;
      userData = user;
      return siteWithoutUserId;
    });

    const { name, avatar } = userData;

    res.status(200).json({ user: { name, avatar }, sites: sitesWithoutUserId });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
