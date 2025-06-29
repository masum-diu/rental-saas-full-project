import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      const items = await prisma.tenant.findMany();
      return res.status(200).json(items);
    }

    if (req.method === "POST") {
      const data = req.body;
      // প্রয়োজনে data validation যোগ করতে পারেন

      const item = await prisma.tenant.create({ data });
      return res.status(201).json(item);
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  } finally {
    await prisma.$disconnect();
  }
}
