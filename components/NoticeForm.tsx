import React, { useState } from "react";

export interface NoticeData {
  title: string;
  body: string;
  category: "Exam" | "Event" | "General";
  priority: "Normal" | "Urgent";
  publishDate: string;
  image: string;
}

interface NoticeFormProps {
  initialData?: NoticeData;
  onSubmit: (data: NoticeData) => Promise<void>;
  buttonText: string;
}

export default function NoticeForm({
  initialData,
  onSubmit,
  buttonText,
}: NoticeFormProps) {
  const [formData, setFormData] = useState<NoticeData>({
    title: initialData?.title || "",
    body: initialData?.body || "",
    category: initialData?.category || "General",
    priority: initialData?.priority || "Normal",
    publishDate: initialData?.publishDate || "",
    image: initialData?.image || "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      await onSubmit(formData);
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const labelClass = "block text-sm font-semibold text-neutral-700 dark:text-zinc-300 mb-1.5 transition-colors";
  
  const inputClass =
    "w-full px-4 py-3 bg-white dark:bg-zinc-950/50 border border-neutral-250 dark:border-zinc-800 rounded-xl text-neutral-900 dark:text-zinc-100 placeholder-neutral-400 dark:placeholder-zinc-555 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all duration-200";

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white dark:bg-zinc-900 border border-neutral-200/85 dark:border-zinc-800/80 shadow-md rounded-3xl p-6 sm:p-10 space-y-6 transition-all duration-300"
    >
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-violet-500 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
          {buttonText}
        </h2>
        <p className="text-sm text-neutral-500 dark:text-zinc-400">
          Fill in the details below to publish your notice
        </p>
      </div>

      {errorMsg && (
        <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 text-red-650 dark:text-red-400 px-4 py-3.5 rounded-xl text-sm flex items-start space-x-3">
          <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div className="whitespace-pre-line font-medium">{errorMsg}</div>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="title" className={labelClass}>Title</label>
          <input
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. End Semester Exam Schedule"
            className={inputClass}
            required
          />
        </div>

        <div>
          <label htmlFor="body" className={labelClass}>Body Content</label>
          <textarea
            id="body"
            name="body"
            rows={5}
            value={formData.body}
            onChange={handleChange}
            placeholder="Write the full notice details here..."
            className={inputClass}
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="category" className={labelClass}>Category</label>
            <div className="relative">
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`${inputClass} appearance-none pr-10`}
              >
                <option value="Exam">Exam</option>
                <option value="Event">Event</option>
                <option value="General">General</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-neutral-400 dark:text-zinc-500">
                <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="priority" className={labelClass}>Priority</label>
            <div className="relative">
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className={`${inputClass} appearance-none pr-10`}
              >
                <option value="Normal">Normal</option>
                <option value="Urgent">Urgent</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-neutral-400 dark:text-zinc-500">
                <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="publishDate" className={labelClass}>Publish Date</label>
            <input
              id="publishDate"
              type="date"
              name="publishDate"
              value={formData.publishDate}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label htmlFor="image" className={labelClass}>Image URL (Optional)</label>
            <input
              id="image"
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://images.unsplash.com/photo-..."
              className={inputClass}
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full mt-2 relative group overflow-hidden bg-gradient-to-r from-violet-600 via-pink-600 to-cyan-600 hover:from-violet-555 hover:via-pink-555 hover:to-cyan-555 text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-300 shadow-md shadow-violet-500/10 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
      >
        <div className="flex items-center justify-center space-x-2">
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Processing...</span>
            </>
          ) : (
            <span>{buttonText}</span>
          )}
        </div>
      </button>
    </form>
  );
}