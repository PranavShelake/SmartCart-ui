/**
 * navConfig.ts
 * ─────────────────────────────────────────────────────────────
 * Single place to register ALL sidebar navigation items.
 *
 * When you add a new module (e.g. "Reports", "Discounts"):
 *   1. Add it here — that's it.
 *   2. The Sidebar automatically renders it.
 *   3. Add the route in App.tsx / your router config.
 *
 * `icon` uses Material Symbols Outlined ligature names.
 * `badge` is optional — pass a number for notification dots.
 * `section` groups items under a divider label.
 * ─────────────────────────────────────────────────────────────
 */

export type NavItem = {
  label: string;
  path: string;
  icon: string;
  badge?: number;
  section?: "main" | "secondary";
};

export const NAV_ITEMS: NavItem[] = [
  // ── Main navigation ───────────────────────────────────────
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: "dashboard",
    section: "main",
  },
  {
    label: "Sales",
    path: "/sales",
    icon: "payments",
    section: "main",
  },
  {
    label: "Orders",
    path: "/orders",
    icon: "shopping_cart",
    badge: 4,          // e.g. 4 pending orders — wire to Redux later
    section: "main",
  },
  {
    label: "Inventory",
    path: "/inventory",
    icon: "inventory_2",
    section: "main",
  },
  {
    label: "Customers",
    path: "/customers",
    icon: "group",
    section: "main",
  },
  {
    label: "Analytics",
    path: "/analytics",
    icon: "monitoring",
    section: "main",
  },

  // ── Secondary (bottom area) ───────────────────────────────
  {
    label: "Settings",
    path: "/settings",
    icon: "settings",
    section: "secondary",
  },
];