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
      const item = await prisma.tenant.findUnique({ where: { id } });
      if (!item) return res.status(404).json({ message: "Not found" });
      return res.status(200).json(item);
    }

    if (req.method === "PUT") {
      const data = req.body; // প্রয়োজনে data এর টাইপ ডিফাইন করুন
      const updated = await prisma.tenant.update({ where: { id }, data });
      return res.status(200).json(updated);
    }

    if (req.method === "DELETE") {
      await prisma.tenant.delete({ where: { id } });
      return res.status(204).end();
    }

    res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    await prisma.$disconnect();
  }
}
