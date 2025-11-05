"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="border-border bg-background sticky top-0 z-50 border-b">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-foreground text-xl font-bold transition-opacity hover:opacity-80"
        >
          🐔 B.C.Market
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className={`text-sm font-medium transition-colors ${
              isActive("/login")
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Login
          </Link>
          <Button size="sm" asChild className="rounded-lg">
            <Link href="/register">Sign Up</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
