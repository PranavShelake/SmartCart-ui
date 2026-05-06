// src/types/index.ts
// ─────────────────────────────────────────────────────────────
// Central type definitions for Smart Cart.
// Import from here in every component — never redefine locally.
// Mirrors the exact shape returned by the FastAPI backend.
// ─────────────────────────────────────────────────────────────

// ── API Envelope ──────────────────────────────────────────────
export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
  meta?: PaginationMeta
  error?: {
    code:    string
    message: string
    details: Record<string, unknown> | null
  }
}

export interface PaginationMeta {
  page:        number
  per_page:    number
  total:       number
  total_pages: number
}

// ── Auth & Users ──────────────────────────────────────────────
// Roles are UPPERCASE — matches FastAPI backend exactly
export type UserRole = 'ADMIN' | 'SELLER' | 'CUSTOMER'

export interface UserProfile {
  id:         number         // backend returns `id` as INTEGER
  email:      string
  first_name: string
  last_name:  string
  phone:      string | null
  roles:      UserRole[]
  is_active:  boolean
  avatar_url?: string | null
}

// ── Categories ────────────────────────────────────────────────
export interface Category {
  id:                 number
  name:               string
  slug:               string
  description:        string | null
  parent_category_id: number | null
  image_url:          string | null
  display_order:      number
  is_active:          boolean
}

export interface CategoryTree extends Category {
  children:   CategoryTree[]
  breadcrumb?: { id: number; name: string; slug: string }[]
}

export interface CategoryCreatePayload {
  name:               string
  slug?:              string
  description?:       string
  parent_category_id?: number | null
  image_url?:         string | null
  display_order?:     number
  is_active?:         boolean
}

export interface CategoryUpdatePayload extends Partial<CategoryCreatePayload> {}

// ── Products ──────────────────────────────────────────────────
export interface ProductVariant {
  id:               number
  sku:              string
  variant_name:     string | null
  size:             string | null
  color:            string | null
  material:         string | null
  price:            number
  compare_at_price: number | null
  stock:            number
  is_active:        boolean
}

export interface ProductImage {
  id:            number
  image_url:     string
  alt_text:      string | null
  is_primary:    boolean
  display_order: number
}

// Full product — returned by GET /products/:slug
export interface Product {
  id:                  number
  name:                string
  slug:                string
  category_id:         number | null
  sku:                 string | null
  price:               number
  compare_at_price:    number | null
  description:         string | null
  short_description:   string | null
  stock:               number
  low_stock_threshold: number
  is_active:           boolean
  is_featured:         boolean
  average_rating:      number
  total_reviews:       number
  total_sales:         number
  variants:            ProductVariant[]
  images:              ProductImage[]
}

// Lightweight — returned by GET /products (listing)
export interface ProductListItem {
  id:               number
  name:             string
  slug:             string
  category_id?:     number | null
  price:            number
  compare_at_price: number | null
  stock:            number
  is_active:        boolean
  is_featured:      boolean
  average_rating:   number
  total_reviews:    number
  primary_image:    string | null
}

export interface ProductFilterParams {
  search?:      string
  category_id?: number
  category_slug?: string 
  min_price?:   number
  max_price?:   number
  is_featured?: boolean
  in_stock?:    boolean
  sort?:        'created_at_desc' | 'created_at_asc' | 'price_asc' | 'price_desc' | 'rating_desc' | 'sales_desc'
  page?:        number
  per_page?:    number
}

export interface ProductCreatePayload {
  name:                string
  slug?:               string
  category_id?:        number | null
  sku?:                string
  price:               number
  compare_at_price?:   number | null
  cost_per_item?:      number | null
  description?:        string
  short_description?:  string
  stock?:              number
  low_stock_threshold?: number
  is_active?:          boolean
  is_featured?:        boolean
}

export interface ProductUpdatePayload extends Partial<ProductCreatePayload> {}

export interface VariantCreatePayload {
  sku:              string
  variant_name?:    string
  size?:            string
  color?:           string
  material?:        string
  price:            number
  compare_at_price?: number
  stock?:           number
  is_active?:       boolean
}

export interface ImageCreatePayload {
  image_url:     string
  alt_text?:     string
  is_primary?:   boolean
  display_order?: number
}

// ── Orders ────────────────────────────────────────────────────
// (Placeholder — will be expanded in Phase 4)
export interface Order {
  id:              number
  order_number:    string
  user_id:         number
  total_price:     number
  order_state_id:  number
  payment_status_id: number
  created_at:      string
}

// ── Cart ──────────────────────────────────────────────────────
// (Placeholder — will be expanded in Phase 3)
export interface CartItem {
  id:                 number
  product_id:         number
  product_variant_id: number | null
  quantity:           number
  price_snapshot:     number
}

// ── Addresses ─────────────────────────────────────────────────
export interface Address {
  id:            number
  address_type:  'billing' | 'shipping' | 'both'
  full_name:     string
  phone:         string
  address_line1: string
  address_line2: string | null
  city:          string
  state:         string
  postal_code:   string
  country:       string
  is_default:    boolean
}

// ── Redux State shapes ────────────────────────────────────────
export interface AsyncSliceState {
  isLoading: boolean
  error:     string | null
}

export interface ProductsState extends AsyncSliceState {
  items:           ProductListItem[]
  total:           number
  totalPages:      number
  selectedProduct: Product | null
  filters:         ProductFilterParams
}

export interface CategoriesState extends AsyncSliceState {
  items:            Category[]
  tree:             CategoryTree[]
  selectedCategory: Category | null
}
