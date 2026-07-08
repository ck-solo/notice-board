import { useRouter } from "next/router";
import NoticeForm, { NoticeData } from "@/components/NoticeForm";
import Link from "next/link";

export default function NewNoticePage() {
  const router = useRouter();

  async function handleCreate(data: NoticeData) {
    const response = await fetch("/api/notices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.errors?.join("\n") || "Failed to create notice");
    }

    router.push("/");
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center transition-colors duration-300">
      <div className="max-w-2xl mx-auto w-full mb-6">
        <Link href="/" className="inline-flex items-center text-sm font-semibold text-neutral-500 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to board
        </Link>
      </div>
      <NoticeForm
        buttonText="Create Notice"
        onSubmit={handleCreate}
      />
    </div>
  );
}
