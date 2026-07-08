import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Notice {
  id: string;
  title: string;
  body: string;
  category: "Exam" | "Event" | "General";
  priority: "Normal" | "Urgent";
  publishDate: string;
  image?: string;
  createdAt: string;
}

export default function Home() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedPriority, setSelectedPriority] = useState<string>("All");

  async function fetchNotices() {
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await fetch("/api/notices");
      if (!res.ok) {
        throw new Error("Failed to fetch notices");
      }
      const data = await res.json();
      setNotices(data);
    } catch (err: any) {
      console.error(err);
      setErrorMsg("Unable to load notices. Please check your database connection.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchNotices();
  }, []);

  async function deleteNotice(id: string) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this notice?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/notices/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        // Refresh local list
        setNotices((prev) => prev.filter((notice) => notice.id !== id));
      } else {
        alert("Failed to delete notice");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while deleting the notice");
    }
  }

  // Filter notices based on search query, category, and priority
  const filteredNotices = notices.filter((notice) => {
    const matchesSearch =
      notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.body.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || notice.category === selectedCategory;
    const matchesPriority =
      selectedPriority === "All" || notice.priority === selectedPriority;

    return matchesSearch && matchesCategory && matchesPriority;
  });

  // Category styling map
  const categoryStyles = {
    Exam: {
      badge: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20",
      gradient: "from-violet-500 to-indigo-650",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    Event: {
      badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
      gradient: "from-emerald-500 to-teal-650",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    General: {
      badge: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20",
      gradient: "from-cyan-500 to-blue-650",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
        </svg>
      ),
    },
  };

  // Stats calculation
  const totalCount = notices.length;
  const urgentCount = notices.filter((n) => n.priority === "Urgent").length;
  const examCount = notices.filter((n) => n.category === "Exam").length;
  const eventCount = notices.filter((n) => n.category === "Event").length;

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-zinc-950 text-neutral-800 dark:text-zinc-100 selection:bg-violet-500 selection:text-white pb-20">
      
      {/* Decorative top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[350px] bg-gradient-to-b from-violet-500/5 dark:from-violet-500/10 via-transparent to-transparent blur-3xl pointer-events-none rounded-full" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 relative z-10">
        
        {/* Header / Nav */}
        <header className="flex flex-col sm:flex-row justify-between items-center gap-4 pb-8 mb-8 border-b border-neutral-200 dark:border-zinc-800/80">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-500 to-pink-500 flex items-center justify-center shadow-sm shadow-violet-500/10">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 4a2 2 0 012 2v8a2 2 0 01-2 2h-3m-1 0V9a2 2 0 00-2-2h-3" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-zinc-50">
                Notice Board
              </h1>
              <p className="text-xs text-neutral-500 dark:text-zinc-400 font-medium">Campus Updates & Announcements</p>
            </div>
          </div>
          
          <Link
            href="/notices/new"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white font-semibold px-5 py-2.5 rounded-xl transition-all duration-300 shadow-md shadow-violet-500/10 active:scale-[0.98] group cursor-pointer"
          >
            <svg className="w-4.5 h-4.5 text-white group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Add Notice</span>
          </Link>
        </header>

        {/* Stats Dashboard Grid */}
        {!loading && !errorMsg && totalCount > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white dark:bg-zinc-900/40 border border-neutral-200/80 dark:border-zinc-800/50 rounded-2xl p-4 flex flex-col justify-between hover:border-neutral-300 dark:hover:border-zinc-700/80 transition-colors shadow-xs">
              <span className="text-xs text-neutral-500 dark:text-zinc-400 font-semibold uppercase tracking-wider">Total Notices</span>
              <span className="text-2xl font-bold mt-2 text-neutral-900 dark:text-white-550">{totalCount}</span>
            </div>
            <div className="bg-white dark:bg-zinc-900/40 border border-neutral-200/80 dark:border-zinc-800/50 rounded-2xl p-4 flex flex-col justify-between hover:border-neutral-300 dark:hover:border-zinc-700/80 transition-colors shadow-xs">
              <span className="text-xs text-pink-500 dark:text-pink-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-pulse" />
                Urgent
              </span>
              <span className="text-2xl font-bold mt-2 text-pink-500 dark:text-pink-400">{urgentCount}</span>
            </div>
            <div className="bg-white dark:bg-zinc-900/40 border border-neutral-200/80 dark:border-zinc-800/50 rounded-2xl p-4 flex flex-col justify-between hover:border-neutral-300 dark:hover:border-zinc-700/80 transition-colors shadow-xs">
              <span className="text-xs text-violet-550 dark:text-violet-400 font-semibold uppercase tracking-wider">Exams</span>
              <span className="text-2xl font-bold mt-2 text-violet-550 dark:text-violet-400">{examCount}</span>
            </div>
            <div className="bg-white dark:bg-zinc-900/40 border border-neutral-200/80 dark:border-zinc-800/50 rounded-2xl p-4 flex flex-col justify-between hover:border-neutral-300 dark:hover:border-zinc-700/80 transition-colors shadow-xs">
              <span className="text-xs text-emerald-550 dark:text-emerald-400 font-semibold uppercase tracking-wider">Events</span>
              <span className="text-2xl font-bold mt-2 text-emerald-550 dark:text-emerald-400">{eventCount}</span>
            </div>
          </div>
        )}

        {/* Filter Controls Bar */}
        {!errorMsg && (
          <div className="bg-white/80 dark:bg-zinc-900/40 border border-neutral-200/80 dark:border-zinc-800/50 backdrop-blur-md rounded-2xl p-4 mb-8 flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between shadow-xs">
            {/* Search Input */}
            <div className="relative flex-1 max-w-lg">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400 dark:text-zinc-500">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notices by title or content..."
                className="w-full bg-white dark:bg-zinc-950/80 text-neutral-900 dark:text-zinc-100 placeholder-neutral-400 dark:placeholder-zinc-500 text-sm pl-11 pr-4 py-2.5 rounded-xl border border-neutral-200 dark:border-zinc-800/80 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all duration-200"
              />
            </div>

            {/* Filter Dropdowns */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Category Select */}
              <div className="relative min-w-[130px]">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full appearance-none bg-white dark:bg-zinc-950/80 text-neutral-700 dark:text-zinc-300 text-xs px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-zinc-800/80 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 pr-10 cursor-pointer"
                >
                  <option value="All">All Categories</option>
                  <option value="Exam">Exams</option>
                  <option value="Event">Events</option>
                  <option value="General">General</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-neutral-400 dark:text-zinc-550">
                  <svg className="fill-current h-3.5 w-3.5" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>

              {/* Priority Select */}
              <div className="relative min-w-[130px]">
                <select
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                  className="w-full appearance-none bg-white dark:bg-zinc-950/80 text-neutral-700 dark:text-zinc-300 text-xs px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-zinc-800/80 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 pr-10 cursor-pointer"
                >
                  <option value="All">All Priorities</option>
                  <option value="Urgent">Urgent Only</option>
                  <option value="Normal">Normal Only</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-neutral-400 dark:text-zinc-550">
                  <svg className="fill-current h-3.5 w-3.5" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>

              {/* Reset Button (If active filters) */}
              {(searchQuery || selectedCategory !== "All" || selectedPriority !== "All") && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                    setSelectedPriority("All");
                  }}
                  className="text-xs text-violet-600 dark:text-violet-400 hover:text-violet-500 font-semibold px-3 py-2 rounded-xl transition-colors cursor-pointer"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        )}

        {/* Error Handling State */}
        {errorMsg && (
          <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 text-red-650 dark:text-red-400 p-6 rounded-2xl text-center max-w-xl mx-auto my-12 shadow-md">
            <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-bold mb-2 text-red-800 dark:text-red-300">Failed to Connect</h3>
            <p className="text-sm text-neutral-600 dark:text-zinc-400 mb-6">{errorMsg}</p>
            <button
              onClick={fetchNotices}
              className="bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 text-red-655 dark:text-red-400 text-sm font-semibold px-5 py-2 rounded-xl transition-colors cursor-pointer"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Loading State: Skeleton Card Grid */}
        {loading && (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-zinc-900/30 border border-neutral-200/80 dark:border-zinc-800/60 rounded-3xl p-5 space-y-4 animate-pulse shadow-xs"
              >
                <div className="w-full h-48 bg-neutral-200 dark:bg-zinc-800 rounded-2xl" />
                <div className="flex justify-between items-center">
                  <div className="h-6 w-2/3 bg-neutral-250 dark:bg-zinc-750 rounded-lg" />
                  <div className="h-5 w-16 bg-neutral-250 dark:bg-zinc-750 rounded-lg" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-neutral-200 dark:bg-zinc-800 rounded" />
                  <div className="h-4 w-5/6 bg-neutral-200 dark:bg-zinc-800 rounded" />
                </div>
                <div className="h-4 w-1/2 bg-neutral-200 dark:bg-zinc-800 rounded" />
                <div className="flex justify-between items-center pt-2">
                  <div className="h-4 w-1/3 bg-neutral-200 dark:bg-zinc-800 rounded" />
                  <div className="flex gap-2">
                    <div className="h-8 w-16 bg-neutral-200 dark:bg-zinc-800 rounded-lg" />
                    <div className="h-8 w-16 bg-neutral-200 dark:bg-zinc-800 rounded-lg" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Loaded Notices Content */}
        {!loading && !errorMsg && (
          <>
            {filteredNotices.length === 0 ? (
              <div className="bg-white dark:bg-zinc-900/20 border border-neutral-200/80 dark:border-zinc-800/60 rounded-3xl p-12 text-center max-w-xl mx-auto my-12 shadow-xs">
                <div className="w-16 h-16 bg-neutral-100 dark:bg-zinc-900 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-neutral-200 dark:border-zinc-800/80">
                  <svg className="w-8 h-8 text-neutral-400 dark:text-zinc-550" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0V9a2 2 0 00-2-2H6a2 2 0 00-2 2v4.586a1 1 0 01-.293.707l-2.829 2.828a1 1 0 00-.293.707V19a2 2 0 002 2h2a2 2 0 002-2v-3a1 1 0 011-1h2a1 1 0 011 1v3a2 2 0 002 2h2a2 2 0 002-2v-1.586a1 1 0 01-.293-.707l-2.829-2.828a1 1 0 00-.293-.707V13z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-neutral-700 dark:text-zinc-300">No notices found</h3>
                <p className="text-sm text-neutral-500 dark:text-zinc-500 mt-1 mb-6">
                  {notices.length === 0
                    ? "Get started by publishing your first notice to the board."
                    : "No notices match your active filters. Try adjusting them."}
                </p>
                {notices.length === 0 ? (
                  <Link
                    href="/notices/new"
                    className="inline-flex items-center space-x-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-all duration-205 shadow-md shadow-violet-500/10 cursor-pointer"
                  >
                    <span>Create First Notice</span>
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("All");
                      setSelectedPriority("All");
                    }}
                    className="bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 hover:bg-neutral-50 dark:hover:bg-zinc-800 text-neutral-750 dark:text-zinc-300 text-sm font-semibold px-5 py-2 rounded-xl transition-colors cursor-pointer"
                  >
                    Clear Search Filters
                  </button>
                )}
              </div>
            ) : (
              <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start">
                {filteredNotices.map((notice) => {
                  const design = categoryStyles[notice.category] || categoryStyles.General;

                  return (
                    <div
                      key={notice.id}
                      className={`group relative bg-white dark:bg-zinc-900/35 border hover:border-neutral-300 dark:hover:border-zinc-700/80 hover:bg-white dark:hover:bg-zinc-900/50 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col h-full shadow-sm hover:shadow-md ${
                        notice.priority === "Urgent"
                          ? "border-pink-200 dark:border-pink-950/60 shadow-pink-100/10 hover:border-pink-400 dark:hover:border-pink-900/60"
                          : "border-neutral-200 dark:border-zinc-800/80"
                      }`}
                    >
                      {/* Notice Header Image / Fallback Gradient */}
                      <div className="relative h-48 w-full overflow-hidden bg-neutral-100 dark:bg-zinc-950">
                        {notice.image ? (
                          <img
                            src={notice.image}
                            alt={notice.title}
                            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                            onError={(e) => {
                              // If image fails, convert to fallback gradient
                              (e.target as HTMLElement).style.display = "none";
                              const fallback = document.getElementById(`fallback-${notice.id}`);
                              if (fallback) fallback.style.display = "flex";
                            }}
                          />
                        ) : null}

                        {/* Fallback visual gradient when no image is supplied or load fails */}
                        <div
                          id={`fallback-${notice.id}`}
                          className={`absolute inset-0 bg-gradient-to-br ${design.gradient} opacity-85 flex items-center justify-center p-6 text-center`}
                          style={{ display: notice.image ? "none" : "flex" }}
                        >
                          <div className="text-white/20 absolute -right-8 -bottom-8">
                            {React.cloneElement(design.icon, { className: "w-36 h-36" })}
                          </div>
                          <h3 className="font-extrabold text-lg text-white/90 leading-tight select-none">
                            {notice.title}
                          </h3>
                        </div>

                        {/* Category pill on top of image */}
                        <div className="absolute top-4 left-4 z-10">
                          <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl backdrop-blur-md ${design.badge}`}>
                            {design.icon}
                            {notice.category}
                          </span>
                        </div>

                        {/* Red urgent badge floating top-right if Urgent */}
                        {notice.priority === "Urgent" && (
                          <div className="absolute top-4 right-4 z-10">
                            <span className="inline-flex items-center gap-1.5 bg-red-650 text-white text-xs font-black px-3 py-1.5 rounded-xl shadow-lg shadow-red-500/25 border border-red-400/20 animate-pulse">
                              <span className="w-1.5 h-1.5 bg-white rounded-full" />
                              URGENT
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Notice Info Container */}
                      <div className="p-6 flex flex-col flex-1">
                        <h2 className="text-xl font-bold text-neutral-900 dark:text-zinc-100 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors line-clamp-2 leading-snug mb-3">
                          {notice.title}
                        </h2>

                        <p className="text-neutral-600 dark:text-zinc-400 text-sm leading-relaxed whitespace-pre-line flex-1 mb-5 line-clamp-6">
                          {notice.body}
                        </p>

                        <div className="pt-4 border-t border-neutral-100 dark:border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          {/* Publish Date info */}
                          <div className="flex items-center text-xs text-neutral-500 dark:text-zinc-500 font-semibold gap-1.5">
                            <svg className="w-4 h-4 text-neutral-400 dark:text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>Published: {new Date(notice.publishDate).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</span>
                          </div>

                          {/* Quick Admin Actions */}
                          <div className="flex gap-2">
                            <Link
                              href={`/notices/${notice.id}/edit`}
                              className="bg-neutral-50 hover:bg-neutral-100 dark:bg-zinc-800/40 dark:hover:bg-zinc-800/80 border border-neutral-200 dark:border-zinc-700/50 text-amber-600 dark:text-amber-400 hover:text-amber-500 text-xs font-bold p-2.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer"
                              title="Edit notice"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                              <span className="sm:hidden md:inline lg:hidden xl:inline">Edit</span>
                            </Link>

                            <button
                              onClick={() => deleteNotice(notice.id)}
                              className="bg-pink-50 hover:bg-pink-100/55 dark:bg-pink-950/10 dark:hover:bg-pink-950/20 border border-pink-200 dark:border-pink-950/50 hover:border-pink-300 dark:hover:border-pink-900/60 text-pink-600 dark:text-pink-400 text-xs font-bold p-2.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer"
                              title="Delete notice"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              <span className="sm:hidden md:inline lg:hidden xl:inline">Delete</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}