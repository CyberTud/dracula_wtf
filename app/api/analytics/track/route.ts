import { NextRequest, NextResponse } from 'next/server'
import { addEvent } from '@/lib/analytics-store'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { event, properties } = body
    
    if (!event) {
      return NextResponse.json(
        { error: 'Event name is required' },
        { status: 400 }
      )
    }
    
    // Get additional context
    const userAgent = request.headers.get('user-agent') || undefined
    const sessionId = request.cookies.get('session_id')?.value
    
    // Store the event
    await addEvent({
      event,
      properties,
      sessionId,
      userAgent
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Analytics tracking error:', error)
    return NextResponse.json(
      { error: 'Failed to track event' },
      { status: 500 }
    )
  }
}