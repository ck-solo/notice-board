# Notice Board Application

A full-stack Notice Board web application built using **Next.js (Pages Router)**, **Prisma**, **PostgreSQL**, and **Tailwind CSS**. The application allows users to create, view, edit, and delete notices while storing data in a persistent hosted database.

---

## Live Demo

**Vercel:** https://YOUR-VERCEL-URL.vercel.app

## GitHub Repository

https://github.com/ck-solo/notice-board

---

# Features

- Create new notices
- View all notices
- Edit existing notices
- Delete notices with confirmation
- Responsive design for desktop and mobile
- Server-side validation
- Persistent PostgreSQL database
- Urgent notices displayed first
- Visible Urgent badge
- Optional image URL support

---

# Tech Stack

- Next.js (Pages Router)
- React
- TypeScript
- Prisma ORM
- PostgreSQL (Hosted)
- Tailwind CSS
- Vercel

---

# Project Structure

```
pages/
│── api/
│   └── notices/
│       ├── index.ts
│       └── [id].ts
│
├── notices/
│   ├── new.tsx
│   └── [id]/
│       └── edit.tsx
│
├── index.tsx

components/
├── NoticeForm.tsx

lib/
├── prisma.ts
├── validateNotice.ts

prisma/
└── schema.prisma

public/

styles/
```

---

# Notice Fields

Each notice contains:

| Field | Description |
|--------|-------------|
| Title | Required short text |
| Body | Required long text |
| Category | Exam, Event, or General |
| Priority | Normal or Urgent |
| Publish Date | Required valid date |
| Image | Optional image URL |

---

# API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/notices` | Fetch all notices |
| POST | `/api/notices` | Create a notice |
| PUT/PATCH | `/api/notices/:id` | Update a notice |
| DELETE | `/api/notices/:id` | Delete a notice |

---

# Validation

Validation is performed on the server before data is saved.

Checks include:

- Title is required
- Body is required
- Publish date must be valid
- Category must be:
  - Exam
  - Event
  - General
- Priority must be:
  - Normal
  - Urgent

Invalid requests return appropriate HTTP status codes with validation error messages.

---

# Database

The application uses **Prisma ORM** connected to a hosted PostgreSQL database.

Features:

- Persistent storage
- Prisma Client
- Data survives page refreshes and redeployments
- Urgent notices are ordered first using Prisma's `orderBy` query instead of client-side sorting.

---

# Getting Started

## 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
cd YOUR-REPOSITORY
```

## 2. Install dependencies

```bash
npm install
```

## 3. Configure environment variables

Create a `.env` file:

```env
DATABASE_URL="your_database_connection_string"
```

## 4. Generate Prisma Client

```bash
npx prisma generate
```

## 5. Run database migrations

```bash
npx prisma migrate deploy
```

For local development, you can also use:

```bash
npx prisma migrate dev
```

## 6. Start the development server

```bash
npm run dev
```

Visit:

```
http://localhost:3000
```

---

# Deployment

The project is deployed on **Vercel**.

Before deployment:

- Configure `DATABASE_URL` in Vercel Environment Variables.
- Ensure the hosted PostgreSQL database is accessible.
- Run Prisma migrations against the production database.

---

# AI Usage

AI (ChatGPT) was used as a development assistant to:

- Explain Next.js Pages Router concepts.
- Explain Prisma queries and schema design.
- Assist with debugging and resolving development issues.
- Improve component structure and code organization.
- Review the project against the assignment requirements.
- Generate and refine project documentation (README).

All application logic, testing, debugging, and final implementation decisions were completed manually.

---

# Future Improvements

With additional development time, I would:

- Implement authentication and user accounts.
- Add search and filtering.
- Add pagination for large datasets.
- Support direct image uploads instead of image URLs.
- Improve accessibility (WCAG compliance).
- Add automated unit and integration tests.
- Enhance loading and error states.

---

# Assignment Requirements Covered

- ✅ Full CRUD functionality
- ✅ Shared create/edit form
- ✅ Server-side validation
- ✅ Prisma ORM
- ✅ Hosted PostgreSQL database
- ✅ Urgent-first ordering in database query
- ✅ Responsive UI
- ✅ Delete confirmation
- ✅ Next.js Pages Router
- ✅ Public GitHub repository
- ✅ Public Vercel deployment
- ✅ AI usage documented
- ✅ Local setup instructions included

---

## Author

**Chandan Kumar**