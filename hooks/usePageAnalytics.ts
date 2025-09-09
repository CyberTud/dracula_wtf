'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { analyticsEvents } from '@/lib/analytics'

export function usePageAnalytics() {
  const pathname = usePathname()
  
  useEffect(() => {
    analyticsEvents.pageView(pathname)
  }, [pathname])
}