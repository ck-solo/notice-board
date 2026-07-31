import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
  };

  const isHome = router.pathname === "/";

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-zinc-950 text-neutral-800 dark:text-zinc-100 transition-colors duration-300 pb-20 relative">
      {/* Decorative top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[350px] bg-gradient-to-b from-violet-500/5 dark:from-violet-500/10 via-transparent to-transparent blur-3xl pointer-events-none rounded-full" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 relative z-10">
        {/* Header / Nav */}
        <header className="flex flex-col sm:flex-row justify-between items-center gap-4 pb-8 mb-8 border-b border-neutral-200 dark:border-zinc-800/80">
          <Link href="/" className="flex items-center space-x-3 group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-violet-600 dark:bg-violet-500 flex items-center justify-center shadow-md shadow-violet-500/10 group-hover:scale-105 transition-all duration-300">
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
          </Link>
          
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            {/* Theme Toggle Button */}
            {mounted ? (
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 text-neutral-600 dark:text-zinc-300 transition-all duration-205 shadow-sm hover:border-neutral-300 dark:hover:border-zinc-700/80 hover:bg-neutral-50 dark:hover:bg-zinc-800/80 cursor-pointer active:scale-95 flex items-center justify-center"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  // Sun Icon (Day Mode)
                  <svg className="w-5 h-5 text-amber-500 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                  </svg>
                ) : (
                  // Moon Icon (Night Mode)
                  <svg className="w-5 h-5 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
            ) : (
              // Skeleton placeholder during SSR/initial mount
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800" />
            )}

            {isHome ? (
              <Link
                href="/notices/new"
                className="inline-flex items-center justify-center space-x-2 bg-violet-600 hover:bg-violet-700 active:bg-violet-800 text-white font-semibold px-5 py-2.5 rounded-xl transition-all duration-300 shadow-md shadow-violet-500/10 active:scale-[0.98] group cursor-pointer"
              >
                <svg className="w-4.5 h-4.5 text-white group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Add Notice</span>
              </Link>
            ) : (
              <Link
                href="/"
                className="inline-flex items-center justify-center space-x-2 bg-white hover:bg-neutral-50 dark:bg-zinc-900 dark:hover:bg-zinc-800/80 border border-neutral-200 dark:border-zinc-800 text-neutral-700 dark:text-zinc-300 font-semibold px-5 py-2.5 rounded-xl transition-all duration-300 shadow-sm active:scale-[0.98] cursor-pointer"
              >
                <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Back to board</span>
              </Link>
            )}
          </div>
        </header>

        {children}
      </div>
    </div>
  );
}
