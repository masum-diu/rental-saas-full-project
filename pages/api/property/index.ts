
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    const items = await prisma.property.findMany();
    return res.status(200).json(items);
  }

  if (req.method === "POST") {
    const data = req.body;
    const item = await prisma.property.create({ data });
    return res.status(201).json(item);
  }

  res.status(405).json({ message: "Method not allowed" });
}
