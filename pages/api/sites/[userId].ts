import { NextApiRequest, NextApiResponse } from "next";
import { Site, User } from "@prisma/client";
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

    let sitesWithoutUserId: Omit<Site, "user" | "userId">[] = [];

    if (sites.length > 0) {
      sitesWithoutUserId = sites.map((site) => {
        const { user, userId, ...siteWithoutUserId } = site;
        userData = user;
        return siteWithoutUserId;
      });
    } else {
      userData = await prisma.user.findFirst({ where: { id: userId } });
    }

    const { name, avatar } = userData;

    res.status(200).json({ user: { name, avatar }, sites: sitesWithoutUserId });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
