/**
 * Sidebar.tsx
 * ─────────────────────────────────────────────────────────────
 * Fixed left sidebar for Smart Cart.
 *
 * - Navigation items are driven by `navConfig.ts` — never hardcoded here.
 * - Uses React Router `NavLink` for automatic active state detection.
 * - Supports optional numeric badges (e.g. pending orders count).
 * - "Upgrade Pro" card at the bottom — can be hidden for Pro users later.
 * ─────────────────────────────────────────────────────────────
 */

import { NavLink } from "react-router-dom";
import { NAV_ITEMS, type NavItem } from "./navConfig";

// ─── Types ────────────────────────────────────────────────────

interface SidebarProps {
  /** Pass `true` to hide the Upgrade Pro upsell card */
  hidePro?: boolean;
}

// ─── Sub-components ───────────────────────────────────────────

function NavItemRow({ item }: { item: NavItem }) {
  return (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        [
          "flex items-center gap-3 px-4 py-[10px] rounded-xl text-sm font-medium transition-all duration-200 relative group",
          isActive
            ? "bg-gradient-to-r from-violet-600/25 to-transparent text-violet-300 border-l-[3px] border-violet-500 pl-[13px]"
            : "text-slate-400 hover:text-slate-100 hover:bg-white/5 border-l-[3px] border-transparent",
        ].join(" ")
      }
    >
      {/* Icon */}
      <span
        className="material-symbols-outlined text-[20px] transition-transform duration-200 group-hover:scale-110 shrink-0"
      >
        {item.icon}
      </span>

      {/* Label */}
      <span className="font-display tracking-tight flex-1">{item.label}</span>

      {/* Optional badge */}
      {item.badge != null && item.badge > 0 && (
        <span className="text-[10px] font-bold bg-violet-600 text-white rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 leading-none">
          {item.badge > 99 ? "99+" : item.badge}
        </span>
      )}
    </NavLink>
  );
}

// ─── Main Component ───────────────────────────────────────────

export default function Sidebar({ hidePro = false }: SidebarProps) {
  const mainItems = NAV_ITEMS.filter((i) => i.section === "main");
  const secondaryItems = NAV_ITEMS.filter((i) => i.section === "secondary");

  return (
    <aside className="fixed left-0 top-0 h-full w-[280px] flex flex-col z-50 glass-nav border-r border-white/[0.08]">

      {/* ── Brand logo ──────────────────────────────────────── */}
      <div className="px-6 pt-8 pb-6 flex items-center gap-3 shrink-0">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-blue-500 flex items-center justify-center shadow-glow-purple shrink-0">
          <span className="material-symbols-outlined text-white text-[20px]">
            shopping_cart
          </span>
        </div>
        <div>
          <h1 className="text-[17px] font-bold text-white font-display tracking-tight leading-none">
            Smart Cart
          </h1>
          <p className="text-[10px] uppercase tracking-[0.15em] text-slate-500 font-display mt-0.5">
            Command Center
          </p>
        </div>
      </div>

      {/* ── Main nav ────────────────────────────────────────── */}
      <nav className="flex-1 overflow-y-auto px-3 space-y-0.5 pb-4">
        <p className="text-[10px] uppercase tracking-[0.15em] text-slate-600 font-display px-4 pb-2 pt-1">
          Main Menu
        </p>
        {mainItems.map((item) => (
          <NavItemRow key={item.path} item={item} />
        ))}
      </nav>

      {/* ── Upgrade Pro card ────────────────────────────────── */}
      {!hidePro && (
        <div className="px-4 pb-4 shrink-0">
          <div className="glass-panel rounded-2xl p-4 relative overflow-hidden">
            {/* Decorative glow blob */}
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-violet-500/10 rounded-full blur-2xl pointer-events-none" />
            <p className="text-xs text-slate-400 mb-0.5 relative z-10 font-display">
              Unlock all features
            </p>
            <p className="text-[11px] text-slate-500 mb-3 relative z-10">
              Advanced analytics, exports & more
            </p>
            <button className="btn-primary w-full py-2 rounded-lg relative z-10">
              Upgrade to Pro
            </button>
          </div>
        </div>
      )}

      {/* ── Secondary nav + logout ──────────────────────────── */}
      <div className="px-3 pb-6 border-t border-white/[0.06] pt-3 shrink-0 space-y-0.5">
        {secondaryItems.map((item) => (
          <NavItemRow key={item.path} item={item} />
        ))}
        <button className="flex items-center gap-3 px-4 py-[10px] rounded-xl text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200 w-full border-l-[3px] border-transparent font-medium">
          <span className="material-symbols-outlined text-[20px] shrink-0">
            logout
          </span>
          <span className="font-display tracking-tight">Logout</span>
        </button>
      </div>
    </aside>
  );
}