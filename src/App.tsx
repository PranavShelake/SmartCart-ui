// import { useSelector, useDispatch } from 'react-redux'
// import type { RootState } from './store/store'
// import DashboardPage from './pages/dashboard/DashboardPage'
// import Login from "./pages/Login";
// export default function App() {
//   const count = useSelector((state: RootState) => state.counter.value)
//   const dispatch = useDispatch()

//   return (
//     <>
//       <DashboardPage />
//     </>

//   )
// }
/**
 * App.tsx
 * ─────────────────────────────────────────────────────────────
 * Root router configuration.
 *
 * Pattern:
 *   - AppShell is a layout route (no `path`) — wraps all protected pages.
 *   - Add new module pages as nested <Route> inside the AppShell route.
 *   - Public routes (login, signup) sit outside AppShell.
 *
 * Adding a new module later:
 *   1. Create `src/pages/YourModulePage.tsx`
 *   2. Add `<Route path="/your-module" element={<YourModulePage />} />`
 *      inside the AppShell route block below.
 *   3. Add the nav item to `src/components/layout/navConfig.ts`.
 *   Done. ✓
 * ─────────────────────────────────────────────────────────────
 */

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppShell from "./components/layout/AppShell";

// ── Pages (import as you build each module) ──────────────────
import DashboardPage from "./pages/dashboard/DashboardPage";
import LoginPage from "./pages/auth/LoginPage";
// import SalesPage      from "./pages/SalesPage";       // Step N
// import OrdersPage     from "./pages/OrdersPage";      // Step N
// import InventoryPage  from "./pages/InventoryPage";   // Step N
// import CustomersPage  from "./pages/CustomersPage";   // Step N
// import AnalyticsPage  from "./pages/AnalyticsPage";   // Step N
// import SettingsPage   from "./pages/SettingsPage";    // Step N

// ── Placeholder until each page is built ─────────────────────
function ComingSoon({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <span className="material-symbols-outlined text-[64px] text-slate-700">
        construction
      </span>
      <h2 className="text-headline-md font-display text-slate-400">{label}</h2>
      <p className="text-slate-600 text-sm">This module is coming soon.</p>
    </div>
  );
}

// ─── Router ──────────────────────────────────────────────────

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Public routes (no shell) ──────────────────── */}
        <Route path="/login" element={<LoginPage />} />

        {/* ── Protected / shell routes ──────────────────── */}
        <Route element={<AppShell />}>
          {/* Default redirect */}
          <Route index element={<Navigate to="/dashboard" replace />} />

          {/* Dashboard — built next */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />

          {/* Modules — swap ComingSoon with real pages as you build */}
          <Route path="/sales"     element={<ComingSoon label="Sales" />} />
          <Route path="/orders"    element={<ComingSoon label="Orders" />} />
          <Route path="/inventory" element={<ComingSoon label="Inventory" />} />
          <Route path="/customers" element={<ComingSoon label="Customers" />} />
          <Route path="/analytics" element={<ComingSoon label="Analytics" />} />
          <Route path="/settings"  element={<ComingSoon label="Settings" />} />
        </Route>

        {/* 404 fallback */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}