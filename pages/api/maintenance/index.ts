import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const items = await prisma.maintenance.findMany();
    return res.status(200).json(items);
  }

  if (req.method === "POST") {
    const data = req.body;
    const item = await prisma.maintenance.create({ data });
    return res.status(201).json(item);
  }

  res.status(405).json({ message: "Method not allowed" });
}
