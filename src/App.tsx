import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./store";
import {
  bootstrapAuth,
  sessionExpired,
  selectIsAuthenticated,
  selectIsBootstrapped,
} from "./store/slices/authSlice";

import Layout from "./components/layout/Layout";
import LoginPage from "./pages/auth/LoginPage";
import DashboardPage from "./pages/dashboard/admin/DashboardPage";
import ToastContainer from "./components/ui/Toast";

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

// ── Spinner — shown while bootstrap is in flight ──────────────
function BootstrapSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-blue-500 flex items-center justify-center animate-pulse">
          <span className="material-symbols-outlined text-white text-[20px]">
            shopping_cart
          </span>
        </div>
        <p className="text-slate-500 text-sm font-display tracking-wide">
          Loading...
        </p>
      </div>
    </div>
  );
}

// ── Auth Guard ────────────────────────────────────────────────
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isBootstrapped  = useAppSelector(selectIsBootstrapped);

  // ✅ Wait until bootstrap completes before making any decision.
  // Before this fix, ProtectedRoute redirected immediately because
  // Redux starts with isAuthenticated=false before bootstrap runs.
  if (!isBootstrapped) return <BootstrapSpinner />;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return <>{children}</>;
}

// ── Guest Guard ───────────────────────────────────────────────
function GuestRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isBootstrapped  = useAppSelector(selectIsBootstrapped);

  if (!isBootstrapped) return <BootstrapSpinner />;

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  return <>{children}</>;
}

// ─── Root ─────────────────────────────────────────────────────
function Root() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // ✅ bootstrapAuth only fires API call if token exists in localStorage
    // (guard is inside the thunk) — no pointless network call on /login
    dispatch(bootstrapAuth());

    // ✅ Listen for session expiry dispatched by apiClient interceptor
    // This replaces window.location.href (hard reload) with a clean Redux update
    const handler = () => dispatch(sessionExpired());
    window.addEventListener("auth:session-expired", handler);
    return () => window.removeEventListener("auth:session-expired", handler);
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          }
        />

        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard"  element={<DashboardPage />} />
          <Route path="/sales"      element={<ComingSoon label="Sales" />} />
          <Route path="/orders"     element={<ComingSoon label="Orders" />} />
          <Route path="/inventory"  element={<ComingSoon label="Inventory" />} />
          <Route path="/customers"  element={<ComingSoon label="Customers" />} />
          <Route path="/analytics"  element={<ComingSoon label="Analytics" />} />
          <Route path="/settings"   element={<ComingSoon label="Settings" />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>

      {/* ✅ Toast container lives at root level — never unmounts */}
      <ToastContainer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  );
}