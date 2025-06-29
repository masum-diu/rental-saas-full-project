import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = parseInt(req.query.id as string);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }

  try {
    if (req.method === "GET") {
      const user = await prisma.user.findUnique({ where: { id } });
      if (!user) return res.status(404).json({ message: "User not found" });
      return res.status(200).json(user);
    }

    if (req.method === "PUT") {
      const data = req.body; // প্রয়োজন হলে টাইপ বা ভ্যালিডেশন দিন
      const updatedUser = await prisma.user.update({ where: { id }, data });
      return res.status(200).json(updatedUser);
    }

    if (req.method === "DELETE") {
      await prisma.user.delete({ where: { id } });
      return res.status(204).end();
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  } finally {
    await prisma.$disconnect();
  }
}
