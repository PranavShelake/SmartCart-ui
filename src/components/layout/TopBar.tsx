/**
 * TopBar.tsx
 * ─────────────────────────────────────────────────────────────
 * Fixed top navigation bar.
 *
 * Responsibilities:
 *   - Global search input (wired to state later)
 *   - Notification bell with badge (wire to Redux notification slice later)
 *   - Quick action icons (settings, help)
 *   - User profile avatar + role display
 *
 * Props are intentionally minimal now — notifications count and user
 * info will come from Redux selectors once those slices are built.
 * ─────────────────────────────────────────────────────────────
 */

import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────

interface TopBarProps {
  /** Number of unread notifications — pass 0 to hide dot */
  notificationCount?: number;
  user?: {
    name: string;
    role: string;
    avatarUrl?: string;
  };
}

// ─── Component ───────────────────────────────────────────────

export default function TopBar({
  notificationCount = 3,
  user = {
    name: "Aryan K.",
    role: "Administrator",
    avatarUrl: undefined,
  },
}: TopBarProps) {
  const [searchValue, setSearchValue] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  /** Initials fallback when no avatar image */
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header
      className="fixed top-0 right-0 z-40 flex items-center justify-between px-8 h-[72px] glass-nav border-b border-white/[0.08]"
      style={{ width: "calc(100% - 280px)" }}
    >
      {/* ── Search ──────────────────────────────────────────── */}
      <div className="flex-1 max-w-[520px]">
        <div
          className={[
            "flex items-center gap-3 px-4 py-2.5 rounded-full border transition-all duration-200",
            searchFocused
              ? "bg-white/8 border-violet-500/60 shadow-[0_0_0_3px_rgba(139,92,246,0.15)]"
              : "bg-white/5 border-white/10 hover:border-white/20",
          ].join(" ")}
        >
          <span
            className={[
              "material-symbols-outlined text-[20px] shrink-0 transition-colors duration-200",
              searchFocused ? "text-violet-400" : "text-slate-500",
            ].join(" ")}
          >
            search
          </span>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            placeholder="Search orders, products, or analytics..."
            className="flex-1 bg-transparent text-sm text-on-surface placeholder:text-slate-600 outline-none font-body"
          />
          {searchValue && (
            <button
              onClick={() => setSearchValue("")}
              className="text-slate-500 hover:text-slate-300 transition-colors shrink-0"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
          {/* Keyboard shortcut hint */}
          {!searchFocused && !searchValue && (
            <kbd className="hidden md:flex items-center gap-1 text-[10px] text-slate-600 bg-white/5 border border-white/10 rounded px-1.5 py-0.5 font-mono shrink-0">
              ⌘K
            </kbd>
          )}
        </div>
      </div>

      {/* ── Right actions ────────────────────────────────────── */}
      <div className="flex items-center gap-1 ml-6">

        {/* Notifications */}
        <button className="relative p-2.5 text-slate-400 hover:text-violet-300 hover:bg-white/5 rounded-xl transition-all duration-200">
          <span className="material-symbols-outlined text-[22px]">
            notifications
          </span>
          {notificationCount > 0 && (
            <span className="absolute top-2 right-2 w-2 h-2 bg-violet-500 rounded-full border-2 border-surface animate-pulse-glow" />
          )}
        </button>

        {/* Settings quick-link */}
        <button className="p-2.5 text-slate-400 hover:text-violet-300 hover:bg-white/5 rounded-xl transition-all duration-200">
          <span className="material-symbols-outlined text-[22px]">settings</span>
        </button>

        {/* Help */}
        <button className="p-2.5 text-slate-400 hover:text-violet-300 hover:bg-white/5 rounded-xl transition-all duration-200">
          <span className="material-symbols-outlined text-[22px]">help</span>
        </button>

        {/* Divider */}
        <div className="w-px h-7 bg-white/10 mx-2" />

        {/* User profile */}
        <button className="flex items-center gap-3 pl-1 pr-3 py-1.5 rounded-xl hover:bg-white/5 transition-all duration-200 group">
          {/* Avatar */}
          <div className="relative shrink-0">
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-9 h-9 rounded-full border-2 border-violet-500/40 object-cover"
              />
            ) : (
              <div className="w-9 h-9 rounded-full border-2 border-violet-500/40 bg-gradient-to-br from-violet-600/60 to-blue-500/60 flex items-center justify-center">
                <span className="text-xs font-bold text-white font-display">
                  {initials}
                </span>
              </div>
            )}
            {/* Online indicator */}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-teal-400 rounded-full border-2 border-surface" />
          </div>

          {/* Name + role */}
          <div className="text-left hidden sm:block">
            <p className="text-sm font-bold text-white font-display leading-tight">
              {user.name}
            </p>
            <p className="text-[10px] text-violet-400 font-display uppercase tracking-wider leading-tight">
              {user.role}
            </p>
          </div>

          {/* Chevron */}
          <span className="material-symbols-outlined text-[16px] text-slate-600 group-hover:text-slate-400 transition-colors">
            expand_more
          </span>
        </button>
      </div>
    </header>
  );
}