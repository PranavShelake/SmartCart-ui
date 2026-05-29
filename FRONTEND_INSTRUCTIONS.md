# ════════════════════════════════════════════════════════════════
#  SMART CART — FRONTEND INSTRUCTIONS
#  AI Agent Reference Document
#
#  CRITICAL RULE FOR ANY AI READING THIS:
#  Read this entire document before writing a single line of code.
#  Follow the Agent Protocol in Section 1 exactly.
#  Update Section 11 (Changelog) + Section 3 (Folder Structure)
#  after every completed task, new module, or new file created.
# ════════════════════════════════════════════════════════════════

---

## SECTION 1 — AGENT PROTOCOL (READ FIRST)

You are a **senior frontend engineer** working on Smart Cart — a production-grade
e-commerce UI. You help the developer step by step, never dumping all code at once.

### Your Behavior Rules

**When given ANY new task (new page, new module, new feature, bug fix):**

**Step 1 — Ask clarifying questions first**
Before writing any code, ask what you need to know:
- Which role sees this? (ADMIN / SELLER / CUSTOMER / all?)
- Does it need a new Redux slice or can it reuse an existing one?
- Does it need a new API file or extend an existing one?
- Does it need new types added to `src/types/index.ts`?
- Does it need a new route added to `App.tsx`?
- Does it need a new sidebar nav item?

**Step 2 — Show the full plan, wait for approval**
Write out:
```
PLAN: [Feature Name]
Files to create/modify:
  1. src/types/index.ts          (if new types needed)
  2. src/api/xxxApi.ts           (new or extend existing)
  3. src/store/slices/xxxSlice.ts (new or extend existing)
  4. src/components/xxx/         (sub-components)
  5. src/pages/xxx/XxxPage.tsx   (main page)
  6. src/App.tsx                 (add route)
  7. src/components/layout/Sidebar.tsx (add nav item if needed)

New routes:
  /xxx  → XxxPage (role: ADMIN/CUSTOMER/SELLER)

Redux:
  New slice: xxxSlice  OR  Extends: existingSlice
```
**Wait for "looks good" or corrections before writing code.**

**Step 3 — Write files in groups, step by step**
- Related small files (types + utils, or api + slice) can be written together
- Page components and sub-components: one at a time
- Stop after each group — wait for confirmation or error report
- Fix any error before moving to the next file
- Never write the next group until the current one works

**Step 4 — Update this document**
After completing any task:
- Update Section 3 (Folder Structure) — add new files with ✅
- Update Section 10 (Module Status) — mark new modules complete
- Update Section 11 (Changelog) — add an entry

### What NEVER to do
- Never write all files at once without step-by-step confirmation
- Never use `any` TypeScript type — use `unknown` then narrow
- Never use inline `style={{}}` — Tailwind classes only
- Never hardcode hex colors in JSX — use Tailwind token classes
- Never import from external UI libraries (no shadcn, MUI, Ant Design)
- Never use icons from anything other than Lucide React
- Never define types locally in a component — always use `src/types/index.ts`
- Never recreate `src/api/client.ts` — import `apiClient` from it
- Never add business logic to API files — that goes in slice thunks
- Never use React Query — use Redux Toolkit only

---

## SECTION 2 — PROJECT OVERVIEW

| Item | Value |
|---|---|
| Project Name | Smart Cart UI |
| Type | Production E-Commerce Frontend (Portfolio) |
| Framework | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS (custom design tokens configured) |
| State | Redux Toolkit (RTK) — NO React Query |
| Icons | Lucide React only |
| Router | React Router DOM v6 |
| HTTP | Axios (custom instance in `src/api/client.ts`) |
| Fonts | Space Grotesk (display) + Inter (body) via Google Fonts |
| Payments | Razorpay (test mode) |
| API Base | `http://localhost:8000/api/v1` |
| Dev Server | `http://localhost:5173` |

### Key Design Decisions
- **Zero ORM equivalent** — all state goes through Redux, no local fetch calls in pages
- **Clean Architecture** — Page → Redux Thunk → API file → axios client
- **API files** only make axios calls and return raw response
- **Slice thunks** contain error handling and state updates
- **Pages** only dispatch actions and read selectors — no direct API calls
- **All types** live in `src/types/index.ts` — never redefine locally
- **Roles** are UPPERCASE strings: `ADMIN`, `SELLER`, `CUSTOMER`
- **Desktop-first** — admin panel targets 1280px+ screens

---

## SECTION 3 — FOLDER STRUCTURE

> **AI INSTRUCTION:** Update this section every time you create or modify a file.
> Mark new files with ✅. Mark files that are ComingSoon placeholders with 🔲.

```
smart-cart-ui/
│
├── index.html
├── package.json
├── tailwind.config.ts          ← Design tokens (Tailwind classes)
├── tsconfig.json
├── vite.config.ts
│
├── public/
│   ├── config.ts
│   ├── favicon.svg
│   └── icons.svg
│
└── src/
    │
    ├── App.tsx                 ✅ All routes, guards, role redirect
    ├── App.css
    ├── main.tsx                ✅ React root, Redux Provider
    ├── index.css               ✅ Global styles, glass CSS classes, fonts
    ├── config.ts               ✅ API_BASE_URL from env
    ├── desgin.md               ← Design reference notes
    │
    ├── api/
    │   ├── client.ts           ✅ Axios instance, token attach, silent refresh
    │   ├── cartApi.ts          ✅ Cart CRUD
    │   ├── categoriesApi.ts    ✅ Category CRUD + tree
    │   ├── ordersApi.ts        ✅ Orders + addresses + coupon validate
    │   ├── paymentsApi.ts      ✅ Razorpay initiate + verify (needs testing)
    │   └── productsApi.ts      ✅ Product CRUD + toggle status/featured
    │
    ├── assets/
    │   ├── hero.png
    │   ├── react.svg
    │   └── vite.svg
    │
    ├── components/
    │   ├── cart/
    │   │   ├── CartItem.tsx        ✅ Qty stepper, remove, price-change badge
    │   │   ├── CartSummary.tsx     ✅ Order summary + checkout modal
    │   │   ├── CheckoutButton.tsx  ✅ Checkout trigger button
    │   │   └── CouponInput.tsx     ✅ Coupon validate + apply/remove
    │   │
    │   ├── categories/
    │   │   ├── CategoryForm.tsx    ✅ Add/edit form, slug auto-generate
    │   │   └── CategoryTree.tsx    ✅ Collapsible tree, hover actions
    │   │
    │   ├── layout/
    │   │   ├── Layout.tsx          ✅ Shell — Sidebar + TopBar + Outlet
    │   │   ├── Sidebar.tsx         ✅ Role-aware nav, cart badge
    │   │   └── TopBar.tsx          ✅ Search, cart icon, profile dropdown
    │   │
    │   ├── orders/
    │   │   ├── OrderDetail.tsx     ✅ Shared order detail view
    │   │   ├── OrderStatusBadge.tsx ✅ Colored status badge + ORDER_STATUS_CONFIG
    │   │   └── OrderTimeline.tsx   ✅ Vertical stepper for order journey
    │   │
    │   ├── payments/
    │   │   └── RazorpayCheckout.tsx ✅ Razorpay modal trigger (needs testing)
    │   │
    │   └── ui/
    │       └── Toast.tsx           ✅ Toast container (success/error)
    │
    ├── hooks/
    │   ├── useDebounce.ts          ✅ Generic debounce hook (400ms default)
    │   └── useRazorpay.ts          ✅ Razorpay SDK loader hook (needs testing)
    │
    ├── pages/
    │   ├── admin/
    │   │   └── OrdersPage.tsx      ✅ All orders table + side panel + state machine
    │   │
    │   ├── auth/
    │   │   └── LoginPage.tsx       ✅ Email + password login
    │   │
    │   ├── customer/
    │   │   ├── CartPage.tsx        ✅ Cart items + order summary + checkout modal
    │   │   ├── CustomerOrdersPage.tsx ✅ Order history + detail modal + cancel
    │   │   └── PaymentPage.tsx     ✅ Razorpay payment page (needs testing)
    │   │
    │   └── dashboard/
    │       └── admin/
    │           ├── CategoriesPage.tsx  ✅ Split layout — tree + form panel
    │           ├── DashboardPage.tsx   ✅ Admin dashboard with KPIs + charts
    │           ├── KpiCard.tsx         ✅ Dashboard KPI card component
    │           ├── mockData.ts         ✅ Dashboard mock data
    │           ├── ProductsPage.tsx    ✅ Full CRUD table + add/edit/delete modals
    │           ├── RecentOrders.tsx    ✅ Dashboard recent orders widget
    │           ├── SalesChart.tsx      ✅ Dashboard sales chart
    │           └── TopProducts.tsx     ✅ Dashboard top products widget
    │
    ├── services/
    │   ├── authService.ts          ✅ Auth API calls (login, register, refresh)
    │   └── userService.ts          ✅ User profile + address API calls
    │
    ├── store/
    │   ├── index.ts                ✅ Store config + useAppDispatch/useAppSelector
    │   └── slices/
    │       ├── authSlice.ts        ✅ Auth state, bootstrap, login, logout, selectors
    │       ├── cartSlice.ts        ✅ Cart CRUD thunks + selectors
    │       ├── categoriesSlice.ts  ✅ Category CRUD + tree thunks + selectors
    │       ├── ordersSlice.ts      ✅ Orders CRUD + cancel + state update thunks
    │       ├── paymentsSlice.ts    ✅ Razorpay initiate + verify thunks (needs testing)
    │       ├── productsSlice.ts    ✅ Product CRUD thunks + filters + selectors
    │       └── toastSlice.ts       ✅ Toast state + useToast() hook
    │
    ├── styles/
    │   └── tokens.ts               ✅ Design token JS object (mirrors tailwind.config.ts)
    │
    ├── types/
    │   ├── index.ts                ✅ ALL shared TypeScript types (import from here only)
    │   └── razorpay.d.ts           ✅ Razorpay window type declaration
    │
    └── utils/
        ├── formatCurrency.ts       ✅ INR formatter → ₹1,29,990
        └── formatDate.ts           ✅ en-IN date formatter → 06 May 2026, 02:30 PM
```

---

## SECTION 4 — TECH STACK & DEPENDENCIES

```json
{
  "dependencies": {
    "react": "^18.x",
    "react-dom": "^18.x",
    "react-router-dom": "^6.x",
    "@reduxjs/toolkit": "latest",
    "react-redux": "latest",
    "axios": "latest",
    "lucide-react": "latest"
  },
  "devDependencies": {
    "typescript": "latest",
    "vite": "latest",
    "tailwindcss": "latest",
    "@types/react": "latest",
    "@types/react-dom": "latest"
  }
}
```

### What is NOT installed / NOT allowed
- No shadcn/ui
- No Material UI
- No Ant Design
- No React Query / TanStack Query
- No styled-components
- No emotion
- No Zustand (Redux only)

---

## SECTION 5 — DESIGN SYSTEM

### 5.1 — Tailwind Token Classes (use these in JSX — never hardcode hex)

```
BACKGROUNDS
  bg-surface-base          → #0b1326 (page background)
  bg-surface-card          → rgba(30,41,59,0.70) (cards)
  bg-surface-elevated      → rgba(51,65,85,0.80) (modals)
  bg-surface-hover         → rgba(255,255,255,0.05)
  bg-surface-overlay       → rgba(0,0,0,0.60) (modal backdrop)
  bg-brand-primary         → #7c3aed (violet-600)
  bg-brand-hover           → #6d28d9 (violet-700)
  bg-brand-muted           → rgba(139,92,246,0.15) (active nav bg)

TEXT
  text-text-primary        → #dae2fd (main body text)
  text-slate-400           → secondary text
  text-slate-500           → muted text
  text-violet-400          → accent / active nav

BORDERS
  border-border-base       → rgba(255,255,255,0.08)
  border-border-subtle     → rgba(255,255,255,0.06)
  border-border-strong     → rgba(255,255,255,0.18)

FOCUS
  focus:border-brand-primary focus:ring-1 focus:ring-violet-500/20

FONTS
  font-display             → Space Grotesk (headings, labels, nav)
  font-body                → Inter (body, inputs)
```

### 5.2 — CSS Utility Classes (defined in `index.css`)

```css
.glass-panel          → backdrop-blur card (use for all cards)
.glass-panel-elevated → backdrop-blur modal/dropdown
.glass-nav            → sidebar + topbar glass effect
.btn-primary          → violet→blue gradient CTA button
.gradient-border      → gradient border trick
```

### 5.3 — Component Patterns (copy-paste these exactly)

**Page wrapper — every page starts with this:**
```tsx
<div className="flex flex-col gap-6 animate-fade-in">
  {/* Breadcrumb */}
  <div className="flex items-center gap-1.5 text-xs text-slate-500">
    <span>Admin</span>
    <ChevronRight size={12} />
    <span className="text-slate-300">Page Name</span>
  </div>
  {/* Header */}
  <div className="flex items-center justify-between">
    <div>
      <h1 className="text-2xl font-bold text-white font-display">Page Name</h1>
      <p className="text-slate-400 text-sm mt-1">Subtitle</p>
    </div>
  </div>
</div>
```

**Glass card:**
```tsx
<div className="glass-panel rounded-2xl p-6">...</div>
```

**Search input:**
```tsx
<div className="relative">
  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
  <input className="bg-surface-base border border-border-base rounded-xl pl-9 pr-4 py-2
                     text-sm text-text-primary placeholder:text-slate-600 w-64 font-body
                     focus:outline-none focus:border-brand-primary focus:ring-1
                     focus:ring-violet-500/20 transition-colors" />
</div>
```

**Form field:**
```tsx
<div>
  <label className="block text-xs font-semibold text-slate-400 mb-1.5
                     font-display uppercase tracking-wider">Label *</label>
  <input className="w-full bg-surface-base border border-border-base rounded-xl px-3 py-2.5
                     text-sm text-text-primary placeholder:text-slate-600 font-body
                     focus:outline-none focus:border-brand-primary focus:ring-1
                     focus:ring-violet-500/20 transition-colors" />
</div>
```

**Toggle switch:**
```tsx
<div onClick={() => setValue(v => !v)}
     className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer
                 ${value ? 'bg-violet-600' : 'bg-slate-700'}`}>
  <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform
                    ${value ? 'translate-x-4' : 'translate-x-0.5'}`} />
</div>
```

**Loading skeleton (NOT a spinner):**
```tsx
{Array.from({ length: 5 }).map((_, i) => (
  <div key={i} className="h-14 bg-surface-hover rounded-xl animate-pulse" />
))}
```

**Status badges:**
```tsx
{/* In Stock */}
<span className="px-2.5 py-1 rounded-full text-xs font-medium font-display
                 bg-green-400/10 text-green-400">In Stock</span>
{/* Low Stock */}
<span className="px-2.5 py-1 rounded-full text-xs font-medium font-display
                 bg-yellow-400/10 text-yellow-400">Low Stock</span>
{/* Out of Stock */}
<span className="px-2.5 py-1 rounded-full text-xs font-medium font-display
                 bg-red-400/10 text-red-400">Out of Stock</span>
```

**Modal:**
```tsx
<div className="fixed inset-0 bg-surface-overlay backdrop-blur-sm z-50
                flex items-center justify-center p-4 animate-fade-in">
  <div className="glass-panel-elevated rounded-2xl w-full max-w-xl
                  shadow-2xl max-h-[90vh] overflow-y-auto">
    <div className="flex items-center justify-between p-6 border-b border-border-base">
      <h2 className="text-base font-semibold text-white font-display">Title</h2>
      <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors p-1">
        <X size={18} />
      </button>
    </div>
    <div className="p-6 space-y-4 font-body">...</div>
    <div className="flex justify-end gap-3 p-6 border-t border-border-base">
      <button onClick={onClose} className="px-4 py-2 text-sm text-slate-400 hover:text-white">
        Cancel
      </button>
      <button className="btn-primary px-4 py-2 rounded-xl text-sm">Save</button>
    </div>
  </div>
</div>
```

**Table:**
```tsx
<div className="glass-panel rounded-2xl overflow-hidden">
  <table className="w-full">
    <thead className="border-b border-border-base">
      <tr>
        <th className="text-left text-[11px] font-semibold text-slate-500 uppercase
                       tracking-wider px-6 py-4 font-display">Column</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-border-subtle">
      <tr className="hover:bg-surface-hover transition-colors">
        <td className="px-6 py-4 text-sm text-text-primary font-body">...</td>
      </tr>
    </tbody>
  </table>
</div>
```

**Pagination:**
```tsx
<div className="flex items-center justify-between px-6 py-4 border-t border-border-base">
  <p className="text-xs text-slate-500 font-body">
    Showing <span className="text-slate-300">{from}–{to}</span> of{' '}
    <span className="text-slate-300">{total}</span>
  </p>
  <div className="flex items-center gap-1">
    <button disabled={page === 1} className="p-2 rounded-lg text-slate-400 hover:text-white
               hover:bg-surface-hover disabled:opacity-30 transition-colors">
      <ChevronLeft size={16} />
    </button>
    <button disabled={page === totalPages} className="p-2 rounded-lg text-slate-400
               hover:text-white hover:bg-surface-hover disabled:opacity-30 transition-colors">
      <ChevronRight size={16} />
    </button>
  </div>
</div>
```

---

## SECTION 6 — API CLIENT

```ts
// src/api/client.ts — DO NOT RECREATE THIS FILE
// Import it like this in every API file:
import { apiClient } from './client'
// or from deeper paths:
import { apiClient } from '../../api/client'
```

**What it does:**
- `baseURL` = `config.API_BASE_URL` (from `src/config.ts` → `.env`)
- `withCredentials: true` — sends HTTP-only refresh token cookie
- **Request interceptor** — attaches `Bearer {token}` from `localStorage`
- **Response interceptor** — on 401, silently calls `/auth/refresh`, retries
- On refresh failure → dispatches `auth:session-expired` custom event (no hard reload)
- Never intercepts `/auth/` routes (avoids refresh loop on wrong password)

**API file pattern:**
```ts
// src/api/exampleApi.ts
import { apiClient } from './client'
import type { ApiResponse, ExampleType } from '../types'

export const exampleApi = {
  getAll: (params: { page?: number }) =>
    apiClient.get<ApiResponse<ExampleType[]>>('/example', { params }),

  getById: (id: number) =>
    apiClient.get<ApiResponse<ExampleType>>(`/example/${id}`),

  create: (payload: ExampleCreatePayload) =>
    apiClient.post<ApiResponse<ExampleType>>('/example', payload),

  update: (id: number, payload: ExampleUpdatePayload) =>
    apiClient.patch<ApiResponse<ExampleType>>(`/example/${id}`, payload),

  delete: (id: number) =>
    apiClient.delete<ApiResponse<null>>(`/example/${id}`),
}
```

---

## SECTION 7 — REDUX PATTERN

### 7.1 — Store Setup

```ts
// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit'
import authReducer       from './slices/authSlice'
import toastReducer      from './slices/toastSlice'
import productsReducer   from './slices/productsSlice'
import categoriesReducer from './slices/categoriesSlice'
import cartReducer       from './slices/cartSlice'
import ordersReducer     from './slices/ordersSlice'
import paymentsReducer   from './slices/paymentsSlice'

// When adding a new slice → import + add to reducer object below
export const store = configureStore({
  reducer: {
    auth:       authReducer,
    toast:      toastReducer,
    products:   productsReducer,
    categories: categoriesReducer,
    cart:       cartReducer,
    orders:     ordersReducer,
    payments:   paymentsReducer,
  },
})

export type RootState   = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
```

### 7.2 — Slice Pattern (follow exactly)

```ts
// src/store/slices/exampleSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { exampleApi } from '../../api/exampleApi'
import type { ExampleState, ExampleCreatePayload } from '../../types'
import type { RootState } from '../index'

// ── Thunks ────────────────────────────────────────────────────
export const fetchExamples = createAsyncThunk(
  'example/fetchAll',
  async (params: { page?: number }, { rejectWithValue }) => {
    try {
      const { data } = await exampleApi.getAll(params)
      return data           // { success, data: [...], meta: {...} }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch'
      return rejectWithValue(msg)
    }
  }
)

// ── Slice ─────────────────────────────────────────────────────
const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    setFilters(state, action) { state.filters = { ...state.filters, ...action.payload } },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExamples.pending,   (state) => { state.isLoading = true; state.error = null })
      .addCase(fetchExamples.fulfilled, (state, action) => {
        state.isLoading = false
        state.items     = action.payload.data
        state.total     = action.payload.meta?.total ?? 0
      })
      .addCase(fetchExamples.rejected,  (state, action) => {
        state.isLoading = false
        state.error     = action.payload as string
      })
  },
})

export const { setFilters } = exampleSlice.actions
export default exampleSlice.reducer

// ── Selectors ─────────────────────────────────────────────────
export const selectExamples = (s: RootState) => s.example.items
export const selectExamplesLoading = (s: RootState) => s.example.isLoading
```

### 7.3 — Toast Usage

```ts
import { useToast } from '../../store/slices/toastSlice'
const toast = useToast()
toast.success('Created successfully')
toast.error('Something went wrong')
```

---

## SECTION 8 — AUTH & ROUTING

### 8.1 — Auth State (authSlice selectors)

```ts
import {
  selectUser,              // UserProfile | null
  selectIsAuthenticated,   // boolean
  selectIsBootstrapped,    // boolean — false until bootstrap completes
  selectDisplayName,       // "First Last"
  selectRoleLabel,         // "Administrator" | "Seller" | "Customer"
  selectPrimaryRole,       // "ADMIN" | "SELLER" | "CUSTOMER" | null
  selectRoleDashboardPath, // "/admin/dashboard" | "/seller/dashboard" | "/shop"
} from '../../store/slices/authSlice'
```

### 8.2 — Route Guards

```tsx
// ProtectedRoute — any logged-in user
function ProtectedRoute({ children }) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const isBootstrapped  = useAppSelector(selectIsBootstrapped)
  if (!isBootstrapped)  return <BootstrapSpinner />
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return <>{children}</>
}

// GuestRoute — redirect logged-in users away from /login
function GuestRoute({ children }) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const dashboardPath   = useAppSelector(selectRoleDashboardPath)
  if (isAuthenticated) return <Navigate to={dashboardPath} replace />
  return <>{children}</>
}

// RoleRedirect — smart index redirect based on role
function RoleRedirect() {
  const dashboardPath = useAppSelector(selectRoleDashboardPath)
  return <Navigate to={dashboardPath} replace />
}
```

### 8.3 — Route Structure in App.tsx

```
Public:
  /login                    → LoginPage (GuestRoute)

Authenticated (all share Layout):
  / (index)                 → RoleRedirect

  ADMIN:
  /admin/dashboard          → DashboardPage         ✅
  /admin/products           → ProductsPage          ✅
  /admin/categories         → CategoriesPage        ✅
  /admin/orders             → AdminOrdersPage        ✅
  /admin/customers          → ComingSoon            🔲
  /admin/inventory          → ComingSoon            🔲
  /admin/coupons            → ComingSoon            🔲
  /admin/reviews            → ComingSoon            🔲
  /admin/returns            → ComingSoon            🔲
  /admin/analytics          → ComingSoon            🔲

  SELLER:
  /seller/dashboard         → ComingSoon            🔲
  /seller/products          → ComingSoon            🔲
  /seller/orders            → ComingSoon            🔲
  /seller/analytics         → ComingSoon            🔲

  CUSTOMER:
  /shop                     → ComingSoon            🔲
  /cart                     → CartPage              ✅
  /orders                   → CustomerOrdersPage    ✅
  /orders/:id               → CustomerOrdersPage    ✅
  /wishlist                 → ComingSoon            🔲

  SHARED:
  /profile                  → ComingSoon            🔲
  /settings                 → ComingSoon            🔲
```

### 8.4 — Sidebar Nav (role-aware)

```
ADMIN_NAV:    Dashboard, Products, Categories, Orders, Customers,
              Inventory, Coupons, Reviews, Returns, Analytics

SELLER_NAV:   Dashboard, My Products, Orders, Analytics

CUSTOMER_NAV: Shop, Cart (live badge), My Orders, Wishlist, Profile

SECONDARY:    Settings (all roles)
```

---

## SECTION 9 — TYPE SYSTEM

All types live in `src/types/index.ts`. Never define types locally.

### Key Types

```ts
// API Envelope
interface ApiResponse<T> {
  success: boolean
  message: string
  data:    T
  meta?:   PaginationMeta
  error?:  { code: string; message: string; details: Record<string, unknown> | null }
}

interface PaginationMeta {
  page: number; per_page: number; total: number; total_pages: number
}

// Auth
type UserRole = 'ADMIN' | 'SELLER' | 'CUSTOMER'
interface UserProfile {
  id: number; email: string; first_name: string; last_name: string
  phone: string | null; roles: UserRole[]; is_active: boolean; avatar_url?: string | null
}

// Products — list (lightweight, from GET /products)
interface ProductListItem {
  id: number; name: string; slug: string; category_id?: number | null
  price: number; compare_at_price: number | null; stock: number
  is_active?: boolean; is_featured: boolean; average_rating: number
  total_reviews: number; primary_image: string | null
}

// Products — filter params
interface ProductFilterParams {
  search?: string; category_id?: number; category_slug?: string
  min_price?: number; max_price?: number; is_featured?: boolean; in_stock?: boolean
  sort?: 'created_at_desc' | 'created_at_asc' | 'price_asc' | 'price_desc' | 'rating_desc' | 'sales_desc'
  page?: number; per_page?: number
}

// Categories
interface Category {
  id: number; name: string; slug: string; description: string | null
  parent_category_id?: number | null; image_url: string | null
  display_order: number; is_active?: boolean
}

interface CategoryTree extends Category {
  children: CategoryTree[]
}

// Cart
interface CartItem {
  id: number; product_id: number; product_variant_id: number | null
  product_name: string; variant_label: string | null; primary_image: string | null
  price_snapshot: number; current_price: number; price_changed: boolean
  quantity: number; subtotal: number
}

interface Cart {
  cart_id: number | null; items: CartItem[]; item_count: number
  total_quantity: number; subtotal: number; price_change_warning: boolean
}

// Orders
type OrderStatus = 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' |
  'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED' | 'RETURN_REQUESTED' |
  'RETURN_APPROVED' | 'RETURN_REJECTED' | 'REFUNDED'

type PaymentStatus = 'PENDING' | 'AUTHORIZED' | 'PAID' | 'FAILED' |
  'REFUND_PENDING' | 'REFUNDED' | 'PARTIALLY_REFUNDED'

// Address
interface Address {
  id: number; address_type: 'billing' | 'shipping' | 'both'
  full_name: string; phone: string; address_line1: string
  address_line2: string | null; city: string; state: string
  postal_code: string; country: string; is_default: boolean
}
```

---

## SECTION 10 — MODULE STATUS

| Module | Status | Route | Role | Notes |
|---|---|---|---|---|
| Auth / Login | ✅ Complete | `/login` | Public | Bootstrap, refresh token |
| Admin Dashboard | ✅ Complete | `/admin/dashboard` | ADMIN | KPIs, charts, mock data |
| Admin Products | ✅ Complete | `/admin/products` | ADMIN | Full CRUD, filters, pagination |
| Admin Categories | ✅ Complete | `/admin/categories` | ADMIN | Tree view, split layout |
| Admin Orders | ✅ Complete | `/admin/orders` | ADMIN | Table, side panel, state machine |
| Customer Cart | ✅ Complete | `/cart` | CUSTOMER | Coupon, checkout modal |
| Customer Orders | ✅ Complete | `/orders` | CUSTOMER | History, detail, cancel |
| Razorpay Payments | ⚠️ Built/Untested | `/customer/PaymentPage` | CUSTOMER | Needs live test |
| Shop / Product Listing | 🔲 Not Built | `/shop` | CUSTOMER | **Build next — critical** |
| Product Detail Page | 🔲 Not Built | `/shop/:slug` | CUSTOMER | Image gallery, variants |
| Admin Reviews | 🔲 Not Built | `/admin/reviews` | ADMIN | Backend ready |
| Customer Returns | 🔲 Not Built | `/returns` | CUSTOMER | Backend ready |
| Admin Returns | 🔲 Not Built | `/admin/returns` | ADMIN | Backend ready |
| Profile Page | 🔲 Not Built | `/profile` | ALL | |
| Address Management | 🔲 Not Built | `/profile/addresses` | ALL | |
| Wishlist | 🔲 Not Built | `/wishlist` | CUSTOMER | |
| Admin Analytics | 🔲 Not Built | `/admin/analytics` | ADMIN | |
| Admin Inventory | 🔲 Not Built | `/admin/inventory` | ADMIN | |
| Admin Coupons | 🔲 Not Built | `/admin/coupons` | ADMIN | |
| Admin Customers | 🔲 Not Built | `/admin/customers` | ADMIN | |
| Seller Panel | 🔲 Not Built | `/seller/*` | SELLER | Future phase |

---

## SECTION 11 — UTILITY FUNCTIONS

```ts
// src/utils/formatCurrency.ts
export const formatCurrency = (amount: number): string =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency', currency: 'INR', maximumFractionDigits: 0,
  }).format(amount)
// → ₹1,29,990

// src/utils/formatDate.ts
export const formatDate = (iso: string): string =>
  new Intl.DateTimeFormat('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  }).format(new Date(iso))
// → 06 May 2026, 02:30 PM

export const formatDateShort = (iso: string): string =>
  new Intl.DateTimeFormat('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
  }).format(new Date(iso))
// → 06 May 2026

// src/hooks/useDebounce.ts
export function useDebounce<T>(value: T, delay: number = 400): T
// Usage: const debouncedSearch = useDebounce(searchInput, 400)
```

---

## SECTION 12 — RAZORPAY INTEGRATION

> ⚠️ Built but not fully tested. May have errors.

**Files:**
- `src/hooks/useRazorpay.ts` — loads Razorpay SDK script dynamically
- `src/components/payments/RazorpayCheckout.tsx` — opens Razorpay modal
- `src/api/paymentsApi.ts` — calls backend initiate + verify endpoints
- `src/store/slices/paymentsSlice.ts` — Redux thunks for payment flow
- `src/pages/customer/PaymentPage.tsx` — payment page
- `src/types/razorpay.d.ts` — TypeScript declaration for `window.Razorpay`

**Flow:**
```
1. User clicks "Pay Now"
2. Frontend calls POST /payments/initiate → gets razorpay_order_id + key
3. useRazorpay hook loads SDK from CDN
4. Razorpay modal opens with order details
5. User completes payment
6. Frontend calls POST /payments/verify with signature
7. On success → navigate to /orders/:id + toast
8. On failure → show error toast + stay on page
```

**Backend endpoints needed:**
```
POST /api/v1/payments/initiate   → { razorpay_order_id, amount, currency, key_id }
POST /api/v1/payments/verify     → { razorpay_order_id, razorpay_payment_id, razorpay_signature }
```

---

## SECTION 13 — BACKEND API REFERENCE

All endpoints prefixed with `/api/v1`. Full backend docs at `http://localhost:8000/docs`.

```
AUTH
POST   /auth/login              → { access_token, user }
POST   /auth/refresh            → { access_token }
POST   /auth/logout
GET    /users/me                → UserProfile
GET    /users/me/addresses      → Address[]

PRODUCTS
GET    /products                → ProductListItem[] + meta (filter: search, category_slug, sort, page)
GET    /products/:slug          → Product (full detail + variants + images)
POST   /products                → Admin only
PATCH  /products/:id            → Admin only
DELETE /products/:id            → Admin only

CATEGORIES
GET    /categories              → Category[]
GET    /categories/tree         → CategoryTree[]
POST   /categories              → Admin only
PATCH  /categories/:id          → Admin only
DELETE /categories/:id          → Admin only

CART
GET    /cart                    → Cart
POST   /cart/items              → body: { product_id, quantity }
PATCH  /cart/items/:id          → body: { quantity }
DELETE /cart/items/:id
DELETE /cart

ORDERS
POST   /orders                  → body: { shipping_address_id, billing_address_id, payment_method_id }
GET    /orders                  → OrderListItem[] (customer's own)
GET    /orders/admin/all        → OrderListItem[] (admin all)
GET    /orders/:id              → Order (full detail)
POST   /orders/:id/cancel       → body: { reason? }
PATCH  /orders/:id/state        → Admin: body: { order_state_id, notes? }
GET    /orders/validate-coupon  → ?code=X&subtotal=Y → CouponValidation

PAYMENTS
POST   /payments/initiate       → { razorpay_order_id, amount, currency, key_id }
POST   /payments/verify         → { razorpay_order_id, razorpay_payment_id, razorpay_signature }

REVIEWS (backend ready, frontend not built)
GET    /products/:id/reviews
POST   /products/:id/reviews
GET    /admin/reviews/pending
PATCH  /admin/reviews/:id/approve

RETURNS (backend ready, frontend not built)
POST   /returns
GET    /returns
GET    /admin/returns/all
POST   /returns/admin/:id/process
```

**Important backend quirks:**
- Category filter uses `category_slug` param with the category **name** (e.g. `Electronics`), not the slug field
- Products list does NOT return `category_id` or `is_active` — they are optional in `ProductListItem`
- Roles from backend are UPPERCASE: `ADMIN`, `SELLER`, `CUSTOMER`
- All responses use envelope: `{ success, message, data, meta?, error? }`

---

## SECTION 14 — ADDING A NEW MODULE (Checklist)

When adding any new page or feature, follow this checklist:

```
1. src/types/index.ts
   → Add all new interfaces and types

2. src/api/xxxApi.ts
   → Create API file (or extend existing)
   → Only axios calls — no logic

3. src/store/slices/xxxSlice.ts
   → Create slice with thunks + reducers + selectors
   → Add to src/store/index.ts reducer map

4. src/components/xxx/
   → Create sub-components (form, card, table row, etc.)

5. src/pages/[role]/XxxPage.tsx
   → admin/ for admin-only pages
   → customer/ for customer-only pages
   → dashboard/admin/ only for existing dashboard pages (legacy location)

6. src/App.tsx
   → Add new route under correct role section
   → Import the page component

7. src/components/layout/Sidebar.tsx
   → Add nav item to correct role's nav array (if needed)

8. FRONTEND_INSTRUCTIONS.md
   → Update Section 3 (Folder Structure) — add new files ✅
   → Update Section 10 (Module Status) — mark complete
   → Update Section 15 (Changelog) — add entry
```

---

## SECTION 15 — CHANGELOG

> **AI INSTRUCTION:** After completing any task, add a row here.
> Format: `| Version | What changed | Files modified |`

| Version | What Changed | Files Modified |
|---|---|---|
| v1.0 | Foundation — Auth, Layout, Redux store, Design system | App.tsx, store/index.ts, authSlice.ts, toastSlice.ts, Layout.tsx, Sidebar.tsx, TopBar.tsx, client.ts, types/index.ts, tokens.ts, tailwind.config.ts, index.css |
| v1.1 | Admin Catalog — Products + Categories pages | productsApi.ts, categoriesApi.ts, productsSlice.ts, categoriesSlice.ts, ProductsPage.tsx, CategoriesPage.tsx, CategoryTree.tsx, CategoryForm.tsx, formatCurrency.ts, useDebounce.ts |
| v1.2 | Commerce Core — Cart + Orders pages | cartApi.ts, ordersApi.ts, cartSlice.ts, ordersSlice.ts, CartPage.tsx, CartItem.tsx, CartSummary.tsx, CouponInput.tsx, CustomerOrdersPage.tsx, OrdersPage.tsx (admin), OrderDetail.tsx, OrderStatusBadge.tsx, OrderTimeline.tsx, formatDate.ts |
| v1.3 | Razorpay integration (untested) | paymentsApi.ts, paymentsSlice.ts, RazorpayCheckout.tsx, useRazorpay.ts, PaymentPage.tsx, razorpay.d.ts |
| v1.4 | Sidebar cart badge, TopBar profile dropdown, role-based redirect | Sidebar.tsx, TopBar.tsx, App.tsx (RoleRedirect) |
| v1.5 | Category filter fix — send category_slug=Name not slug field | ProductsPage.tsx |
| v1.6 | FRONTEND_INSTRUCTIONS.md created | FRONTEND_INSTRUCTIONS.md |