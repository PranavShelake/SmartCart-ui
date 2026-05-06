// src/components/layout/TopBar.tsx
import { useState } from 'react'
import { Search, Bell, Settings, HelpCircle, ChevronDown } from 'lucide-react'
import { useAppSelector } from '../../store'
import {
  selectDisplayName,
  selectRoleLabel,
  selectUser,
} from '../../store/slices/authSlice'

export default function TopBar() {
  const [searchValue,   setSearchValue]   = useState('')
  const [searchFocused, setSearchFocused] = useState(false)

  const displayName = useAppSelector(selectDisplayName)
  const roleLabel   = useAppSelector(selectRoleLabel)     // ← 'Administrator' / 'Seller' / 'Customer'
  const user        = useAppSelector(selectUser)

  const initials = displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <header
      className="fixed top-0 right-0 z-40 flex items-center justify-between px-8
                 h-topbar glass-nav border-b border-border-base"
      style={{ width: 'calc(100% - 280px)' }}
    >
      {/* ── Search ──────────────────────────────────────────── */}
      <div className="flex-1 max-w-[520px]">
        <div className={[
          'flex items-center gap-3 px-4 py-2.5 rounded-full border transition-all duration-200',
          searchFocused
            ? 'bg-white/[0.08] border-violet-500/60 shadow-[0_0_0_3px_rgba(139,92,246,0.15)]'
            : 'bg-white/5 border-border-base hover:border-border-strong',
        ].join(' ')}>
          <Search
            size={18}
            className={`shrink-0 transition-colors duration-200 ${
              searchFocused ? 'text-violet-400' : 'text-slate-500'
            }`}
          />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            placeholder="Search orders, products, or analytics..."
            className="flex-1 bg-transparent text-sm text-text-primary
                       placeholder:text-slate-600 outline-none font-body"
          />
          {!searchFocused && !searchValue && (
            <kbd className="hidden md:flex items-center gap-1 text-[10px] text-slate-600
                            bg-white/5 border border-border-base rounded px-1.5 py-0.5
                            font-mono shrink-0">
              ⌘K
            </kbd>
          )}
        </div>
      </div>

      {/* ── Right actions ──────────────────────────────────── */}
      <div className="flex items-center gap-1 ml-6">
        <button className="relative p-2.5 text-slate-400 hover:text-violet-300
                           hover:bg-surface-hover rounded-xl transition-all duration-200">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-violet-500 rounded-full
                           border-2 border-surface-base animate-pulse" />
        </button>

        <button className="p-2.5 text-slate-400 hover:text-violet-300
                           hover:bg-surface-hover rounded-xl transition-all duration-200">
          <Settings size={20} />
        </button>

        <button className="p-2.5 text-slate-400 hover:text-violet-300
                           hover:bg-surface-hover rounded-xl transition-all duration-200">
          <HelpCircle size={20} />
        </button>

        <div className="w-px h-7 bg-border-base mx-2" />

        {/* User profile */}
        <button className="flex items-center gap-3 pl-1 pr-3 py-1.5 rounded-xl
                           hover:bg-surface-hover transition-all duration-200 group">
          <div className="relative shrink-0">
            {user?.avatar_url ? (
              <img
                src={user.avatar_url}
                alt={displayName}
                className="w-9 h-9 rounded-full border-2 border-violet-500/40 object-cover"
              />
            ) : (
              <div className="w-9 h-9 rounded-full border-2 border-violet-500/40
                              bg-gradient-to-br from-violet-600/60 to-blue-500/60
                              flex items-center justify-center">
                <span className="text-xs font-bold text-white font-display">
                  {initials}
                </span>
              </div>
            )}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-teal-400
                             rounded-full border-2 border-surface-base" />
          </div>

          <div className="text-left hidden sm:block">
            <p className="text-sm font-bold text-white font-display leading-tight">
              {displayName || '—'}
            </p>
            <p className="text-[10px] text-violet-400 font-display uppercase
                          tracking-wider leading-tight">
              {roleLabel}
            </p>
          </div>

          <ChevronDown
            size={14}
            className="text-slate-600 group-hover:text-slate-400 transition-colors"
          />
        </button>
      </div>
    </header>
  )
}