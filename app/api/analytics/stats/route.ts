import { NextRequest, NextResponse } from 'next/server'
import { getStats } from '@/lib/analytics-store'

export async function GET(request: NextRequest) {
  try {
    const stats = await getStats()
    
    return NextResponse.json(stats)
  } catch (error) {
    console.error('Analytics stats error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve analytics' },
      { status: 500 }
    )
  }
}