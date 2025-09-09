import { NextRequest, NextResponse } from 'next/server'
import { generateCardImage } from '@/lib/generate-card-image'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    const score = parseInt(searchParams.get('score') || '0')
    const bucket = searchParams.get('bucket') || 'Unknown'
    const mode = searchParams.get('mode') || 'everyday'
    const roast = searchParams.get('roast') || 'No roast available'
    const evidence = searchParams.get('evidence') || ''
    
    const imageBuffer = await generateCardImage({
      score,
      bucket,
      mode,
      roast,
      evidence
    })
    
    return new NextResponse(imageBuffer as any, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000, immutable'
      }
    })
  } catch (error) {
    console.error('Card generation error:', error)
    return new NextResponse('Failed to generate card', { status: 500 })
  }
}