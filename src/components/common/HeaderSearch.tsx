"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

export default function HeaderSearch() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

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
    } else {
      router.push("/");
    }
    setQuery("");
    // 자연스럽게 닫힘
    setOpen(false);
  };

  return (
    <div className="relative flex-1">
      <form onSubmit={handleSubmit} className="flex items-center">
        <div
          className={`bg-muted/10 flex items-center rounded-full transition-all duration-300 ease-out ${
            open ? "px-3 py-1 shadow-sm" : "p-1"
          }`}
          style={{ WebkitBackdropFilter: "blur(6px)", backdropFilter: "blur(6px)" }}
        >
          <div
            className={`flex items-center transform origin-left transition-transform duration-300 ease-out ${
              open ? "scale-x-100 mr-2 w-full sm:w-56" : "scale-x-0 w-0"
            }`}
          >
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="어떤 상품을 찾으시나요?"
              className={`text-foreground placeholder-muted-foreground bg-transparent focus:outline-none text-sm leading-tight py-1 w-full transition-opacity duration-200 ${
                open ? "opacity-100" : "opacity-0 pointer-events-none"
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
      </form>
    </div>
  );
}
