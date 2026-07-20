"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import HeaderMenu from "@/shared/components/HeaderMenu";
import HeaderLanguage from "@/shared/components/HeaderLanguage";
import ThemeToggle from "@/shared/components/ThemeToggle";
import DonateModal from "@/shared/components/DonateModal";
import { useHeaderSearchStore } from "@/store/headerSearchStore";
import { APP_CONFIG } from "@/shared/constants/config";

export default function Header({ onMenuClick, showMenuButton = true }) {
  const [displayName, setDisplayName] = useState("");
  const [loginMethod, setLoginMethod] = useState("");
  const [donateOpen, setDonateOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function loadAuthStatus() {
      try {
        const res = await fetch("/api/auth/status", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled) {
          setDisplayName(data?.displayName || data?.oidcName || data?.oidcEmail || "");
          setLoginMethod(data?.loginMethod || "");
        }
      } catch {
        if (!cancelled) {
          setDisplayName("");
          setLoginMethod("");
        }
      }
    }
    loadAuthStatus();
    return () => { cancelled = true; };
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) window.location.assign("/login");
    } catch (err) {
      console.error("Failed to logout:", err);
    }
  };

  return (
    <header className="shrink-0 flex items-center justify-between gap-3 px-4 h-16 bg-surface border-b border-border-subtle z-20" translate="no">
      {/* Left side: Logo + Hamburger */}
      <div className="flex items-center gap-6 h-full">
        <Link href="/dashboard" className="flex items-center gap-2 h-full" suppressHydrationWarning>
          <img src="/logo-e404r.svg" alt="E404R" className="w-8 h-8" suppressHydrationWarning />
          <h1 className="text-xl font-extrabold tracking-tight text-[#00a8cc] hidden sm:block" suppressHydrationWarning>
            {APP_CONFIG.name}
          </h1>
        </Link>
        
        {showMenuButton && (
          <button onClick={onMenuClick} className="text-text-muted hover:text-text-main transition-colors lg:hidden" suppressHydrationWarning>
            <span className="material-symbols-outlined text-2xl" suppressHydrationWarning>menu</span>
          </button>
        )}
      </div>

      {/* Right side: Actions */}
      <div className="flex items-center gap-2 shrink-0">
        <HeaderSearch />
        
        <button
          onClick={() => setDonateOpen(true)}
          className="flex items-center gap-1.5 px-3 h-8 rounded-lg border border-[#00a8cc] text-[#00a8cc] hover:bg-[#00a8cc]/10 transition-colors text-sm font-semibold"
          aria-label="Donate"
          suppressHydrationWarning
        >
          <span className="material-symbols-outlined text-[18px]" suppressHydrationWarning>volunteer_activism</span>
          <span className="hidden sm:inline" suppressHydrationWarning>Donate</span>
        </button>
        
        <div className="flex items-center"><ThemeToggle /></div>
        <div className="flex items-center"><HeaderLanguage /></div>
        <div className="flex items-center"><HeaderMenu onLogout={handleLogout} /></div>
      </div>
      <DonateModal isOpen={donateOpen} onClose={() => setDonateOpen(false)} />
    </header>
  );
}

function HeaderSearch() {
  const visible = useHeaderSearchStore((s) => s.visible);
  const query = useHeaderSearchStore((s) => s.query);
  const placeholder = useHeaderSearchStore((s) => s.placeholder);
  const setQuery = useHeaderSearchStore((s) => s.setQuery);

  if (!visible) return null;

  return (
    <div className="relative w-[160px] sm:w-[220px]">
      <span className="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-text-muted text-[16px] pointer-events-none">search</span>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full h-8 pl-7 pr-7 rounded-lg border border-border-subtle bg-surface-2 text-sm text-text-main placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
      />
      {query && (
        <button
          type="button"
          onClick={() => setQuery("")}
          className="absolute right-1 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main p-0.5"
        >
          <span className="material-symbols-outlined text-[16px]">close</span>
        </button>
      )}
    </div>
  );
}

Header.propTypes = {
  onMenuClick: PropTypes.func,
  showMenuButton: PropTypes.bool,
};
