import { prisma } from "@/lib/prisma";
import { validateNotice } from "@/lib/validateNotice";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      const notices = await prisma.notice.findMany({
        orderBy: [
          { priority: "desc" },
          { publishDate: "desc" }
        ]
      });
      return res.status(200).json(notices);
    }

    if (req.method === "POST") {
      const result = validateNotice(req.body);

      if (!result.valid) {
        return res.status(400).json({ errors: result.errors });
      }

      const notice = await prisma.notice.create({ data: result.data });
      return res.status(201).json(notice);
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (err) {
    console.error("Error in /api/notices:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
