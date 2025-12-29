"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

export default function HeaderSearch() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const RECENT_KEY = "recent_searches";
  const [recent, setRecent] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem(RECENT_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        setQuery("");
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open]);

  const toggleOpen = () => {
    setOpen((v) => !v);
    setTimeout(() => inputRef.current?.focus(), 120);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (query.trim()) {
      router.push(`/?search=${encodeURIComponent(query)}`);
      addRecent(query.trim());
    } else {
      router.push("/");
    }
    setQuery("");
    // 자연스럽게 닫힘
    setOpen(false);
  };

  const persistRecent = (items: string[]) => {
    try {
      localStorage.setItem(RECENT_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  };

  const addRecent = (q: string) => {
    if (!q) return;
    setRecent((prev) => {
      const next = [q, ...prev.filter((p) => p !== q)].slice(0, 8);
      persistRecent(next);
      return next;
    });
  };

  const removeRecentAt = (idx: number) => {
    setRecent((prev) => {
      const next = prev.filter((_, i) => i !== idx);
      persistRecent(next);
      return next;
    });
  };

  const clearRecents = () => {
    setRecent([]);
    persistRecent([]);
  };

  return (
    <div className="relative flex-1">
      <form onSubmit={handleSubmit} className="flex items-center">
        <div
          className={`bg-muted/10 flex items-center rounded-full transition-all duration-300 ease-out ${
            open ? "px-3 py-1 shadow-sm" : "p-1"
          }`}
          style={{
            WebkitBackdropFilter: "blur(6px)",
            backdropFilter: "blur(6px)",
          }}
        >
          <div
            className={`flex origin-left transform items-center transition-transform duration-300 ease-out ${
              open ? "mr-2 w-full scale-x-100 sm:w-56" : "w-0 scale-x-0"
            }`}
          >
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="검색어 입력"
              className={`text-foreground placeholder-muted-foreground w-full bg-transparent py-1 text-sm leading-tight transition-opacity duration-200 focus:outline-none ${
                open ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            />
          </div>

          <div className="flex items-center gap-1">
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  inputRef.current?.focus();
                }}
                className="text-muted-foreground hover:text-foreground p-2"
                aria-label="지우기"
              >
                <X className="h-4 w-4" />
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                if (open) handleSubmit();
                else toggleOpen();
              }}
              className="text-muted-foreground hover:text-foreground p-2"
              aria-label="검색"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>
        {/* 최근검색어 드롭다운 */}
        {open && recent.length > 0 && (
          <div className="absolute top-full left-0 mt-2 w-full">
            <div className="bg-background border-border rounded-md border shadow-md">
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-muted-foreground text-sm">
                  최근 검색어
                </span>
                <button
                  type="button"
                  onClick={clearRecents}
                  className="text-muted-foreground hover:text-foreground text-xs"
                >
                  전체삭제
                </button>
              </div>
              <div className="divide-y">
                {recent.map((r, i) => (
                  <button
                    key={r + i}
                    onClick={() => {
                      // 즉시 검색
                      router.push(`/?search=${encodeURIComponent(r)}`);
                      addRecent(r);
                      setOpen(false);
                    }}
                    className="hover:bg-muted/5 flex w-full items-center justify-between px-3 py-2 text-left"
                  >
                    <span className="truncate text-sm">{r}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeRecentAt(i);
                      }}
                      className="text-muted-foreground hover:text-foreground ml-3 p-1"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
