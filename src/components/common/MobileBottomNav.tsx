"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, PlusCircle, MessageCircle, User } from "lucide-react";
import { useAuth } from "@/hooks/user/useAuth";
import { useState } from "react";
import SearchModal from "./SearchModal";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { user } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  const handleSearchClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsSearchOpen(true);
  };

  const navItems = [
    { href: "/", icon: Home, label: "홈", onClick: undefined },
    {
      href: "/search",
      icon: Search,
      label: "검색",
      onClick: handleSearchClick,
    },
    {
      href: "/products/create",
      icon: PlusCircle,
      label: "등록",
      onClick: undefined,
    },
    { href: "/chat", icon: MessageCircle, label: "채팅", onClick: undefined },
    {
      href: user ? "/mypage" : "/login",
      icon: User,
      label: "마이",
      onClick: undefined,
    },
  ];

  return (
    <>
      <nav className="border-border bg-background fixed right-0 bottom-0 left-0 z-50 border-t md:hidden">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            if (item.onClick) {
              return (
                <button
                  key={item.href}
                  onClick={item.onClick}
                  className={`flex flex-1 flex-col items-center gap-1 py-2 transition-colors ${
                    active
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="h-6 w-6" />
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-1 flex-col items-center gap-1 py-2 transition-colors ${
                  active
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-6 w-6" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* 검색 모달 */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
