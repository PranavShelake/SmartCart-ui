import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

// ─── Constants (keep in sync with CSS if ever changed) ────────
const SIDEBAR_WIDTH = 280; // px
const TOPBAR_HEIGHT = 72;  // px

export { SIDEBAR_WIDTH, TOPBAR_HEIGHT };

// ─── Component ───────────────────────────────────────────────

export default function AppShell() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-surface text-on-surface flex">

      {/* ── Fixed Sidebar ───────────────────────────────────── */}
      <Sidebar />

      {/* ── Right-side content area ─────────────────────────── */}
      <div
        className="flex flex-col flex-1 min-h-screen"
        style={{ marginLeft: SIDEBAR_WIDTH }}
      >
        {/* Fixed TopBar */}
        <TopBar />

        {/* Scrollable page content */}
        <main
          key={location.pathname}          // re-animate on route change
          className="flex-1 overflow-y-auto animate-fade-in"
          style={{ paddingTop: TOPBAR_HEIGHT }}
        >
          {/* Max-width container — centers content on ultra-wide screens */}
          <div className="max-w-container mx-auto px-8 py-8">
            <Outlet />
          </div>
        </main>
      </div>

      {/* ── Floating chat / support button ──────────────────── */}
      <FloatingActionButton />
    </div>
  );
}

// ─── Floating Action Button ───────────────────────────────────

function FloatingActionButton() {
  return (
    <button
      aria-label="Open support chat"
      className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full flex items-center justify-center
                 bg-gradient-to-tr from-violet-600 to-blue-500
                 shadow-lg shadow-violet-500/30
                 hover:scale-110 active:scale-95
                 transition-all duration-200 group"
    >
      <span className="material-symbols-outlined text-white text-[22px] group-hover:rotate-12 transition-transform duration-200">
        chat_bubble
      </span>
      {/* Unread indicator */}
      <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-surface" />
    </button>
  );
}