import { Category, Priority } from "@prisma/client";

export function validateNotice(body: any) {
  const errors: string[] = [];

  const title = body.title?.trim();
  const noticeBody = body.body?.trim();
  const image = body.image?.trim() || null;
  const publishDate = new Date(body.publishDate);

  if (!title) errors.push("Title is required");
  if (!noticeBody) errors.push("Body is required");

  if (!Object.values(Category).includes(body.category)) {
    errors.push("Invalid category");
  }

  if (!Object.values(Priority).includes(body.priority)) {
    errors.push("Invalid priority");
  }

  if (!body.publishDate || isNaN(publishDate.getTime())) {
    errors.push("Invalid publish date");
  }

  return {
    valid: errors.length === 0,
    errors,
    data: {
      title,
      body: noticeBody,
      category: body.category,
      priority: body.priority,
      publishDate,
      image,
    },
  };
}