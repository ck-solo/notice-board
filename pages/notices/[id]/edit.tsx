import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NoticeForm, { NoticeData } from "@/components/NoticeForm";
import Link from "next/link";

export default function EditNoticePage() {
  const router = useRouter();
  const { id } = router.query;

  const [initialData, setInitialData] = useState<NoticeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    async function fetchNotice() {
      try {
        const response = await fetch(`/api/notices/${id}`);

        if (!response.ok) {
          setErrorMsg("Notice not found or failed to load");
          return;
        }

        const notice = await response.json();

        setInitialData({
          title: notice.title,
          body: notice.body,
          category: notice.category,
          priority: notice.priority,
          publishDate: notice.publishDate.split("T")[0],
          image: notice.image || "",
        });
      } catch {
        setErrorMsg("Failed to load notice. Please check your connection.");
      } finally {
        setLoading(false);
      }
    }

    fetchNotice();
  }, [id]);

  async function handleUpdate(data: NoticeData) {
    const response = await fetch(`/api/notices/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.errors?.join("\n") || "Failed to update notice");
    }

    router.push("/");
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-zinc-950 text-neutral-800 dark:text-zinc-100 flex items-center justify-center transition-colors duration-300">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-neutral-500 dark:text-zinc-400 font-medium animate-pulse">Loading notice details...</p>
        </div>
      </div>
    );
  }

  if (errorMsg || !initialData) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-zinc-950 text-neutral-800 dark:text-zinc-100 flex items-center justify-center p-4 transition-colors duration-300">
        <div className="max-w-md w-full bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 rounded-2xl p-6 text-center shadow-md">
          <div className="w-16 h-16 bg-red-50 dark:bg-red-950/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-200 dark:border-red-900/30">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold mb-2 text-neutral-900 dark:text-zinc-50">Error Loading Notice</h2>
          <p className="text-neutral-605 dark:text-zinc-400 mb-6 text-sm">{errorMsg || "The requested notice could not be found."}</p>
          <Link href="/" className="inline-block bg-violet-600 hover:bg-violet-750 text-white font-semibold px-6 py-2.5 rounded-xl transition-all duration-200 shadow-md shadow-violet-500/10 cursor-pointer">
            Back to Notice Board
          </Link>
        </div>
      </div>
    );
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
        initialData={initialData}
        buttonText="Update Notice"
        onSubmit={handleUpdate}
      />
    </div>
  );
}