import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { validateNotice } from "@/lib/validateNotice";
import { Prisma } from "@prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (typeof id !== "string") {
    return res.status(400).json({ message: "Invalid notice ID" });
  }

  try {
    if (req.method === "GET") {
      const notice = await prisma.notice.findUnique({
        where: { id },
      });

      if (!notice) {
        return res.status(404).json({ message: "Notice not found" });
      }

      return res.status(200).json(notice);
    }

    if (req.method === "PUT" || req.method === "PATCH") {
      const result = validateNotice(req.body);

      if (!result.valid) {
        return res.status(400).json({ errors: result.errors });
      }

      const notice = await prisma.notice.update({
        where: { id },
        data: result.data,
      });

      return res.status(200).json(notice);
    }

    if (req.method === "DELETE") {
      await prisma.notice.delete({
        where: { id },
      });

      return res.status(204).end();
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (err) {
    console.error(`Error in /api/notices/${id}:`, err);
    
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      // Record not found
      if (err.code === "P2025") {
        return res.status(404).json({ message: "Notice not found" });
      }
    }
    
    return res.status(500).json({ message: "Internal server error" });
  }
}
