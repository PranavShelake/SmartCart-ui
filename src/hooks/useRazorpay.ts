// src/hooks/useRazorpay.ts
// Dynamically loads the Razorpay checkout script once.
// Returns a `loadRazorpay` function that resolves when ready.

import { useCallback } from 'react'

const RAZORPAY_SCRIPT = 'https://checkout.razorpay.com/v1/checkout.js'

export function useRazorpay() {

  const loadRazorpay = useCallback((): Promise<boolean> => {
    return new Promise((resolve) => {
      // Already loaded
      if (window.Razorpay) {
        resolve(true)
        return
      }

      // Already in DOM (but not loaded yet)
      const existing = document.getElementById('razorpay-script')
      if (existing) {
        existing.addEventListener('load', () => resolve(true))
        existing.addEventListener('error', () => resolve(false))
        return
      }

      // Inject script
      const script = document.createElement('script')
      script.id    = 'razorpay-script'
      script.src   = RAZORPAY_SCRIPT
      script.async = true
      script.onload  = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }, [])

  return { loadRazorpay }
}