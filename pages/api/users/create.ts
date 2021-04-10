import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@utils/prisma";
import { User } from "@dtos/user";
import userExists from "functions/userExists";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { user } = req.body as { user: User };

  const doesUserExist = await userExists(user.uid);

  if (doesUserExist) {
    return res.status(200).json(user);
  }

  const newUser = await prisma.user.create({
    data: {
      id: user.uid,
      name: user.name,
      avatar: user.photoUrl,
      email: user.email,
      provider: user.provider,
    },
  });

  return res.status(200).json(newUser);
};
