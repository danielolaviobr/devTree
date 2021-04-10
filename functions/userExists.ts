import prisma from "@utils/prisma";

export default async function userExists(userId: string) {
  try {
    const user = await prisma.user.findFirst({ where: { id: userId } });

    if (user) {
      return user.id === userId;
    }
    return false;

  } catch (err) {
    
    console.log(err);
    return false;
  }
}
