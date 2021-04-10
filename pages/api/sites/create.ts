import { auth } from "@firebase/firebase-admin";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@utils/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { token } = req.headers as { [key: string]: string };
    await auth.verifyIdToken(token);
    const { name, url } = req.body;
    const site = await prisma.site.create({
      data: {
        name,
        url,
        user: { connect: { email: "danielolaviobr@gmail.com" } },
      },
    });
    return res.status(200).json({ site });
  } catch (err) {
    if (err.code === "auth/argument-error") {
      return res.status(401).json(err);
    }
    console.log(err);
    return res.status(500).json(err);
  }
};
