import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = parseInt(req.query.id as string);

  if (req.method === "GET") {
    const item = await prisma.payment.findUnique({ where: { id } });
    if (!item) return res.status(404).json({ message: "Not found" });
    console.log(item);
    return res.status(200).json(item);
  }

  if (req.method === "PUT") {
    const data = req.body;
    const updated = await prisma.payment.update({ where: { id }, data });
    return res.status(200).json(updated);
  }

  if (req.method === "DELETE") {
    await prisma.payment.delete({ where: { id } });
    return res.status(204).end();
  }

  res.status(405).json({ message: "Method not allowed" });
}
