import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { analyzeText, Mode } from '@/lib/rubric'
import { generateRoast } from '@/lib/llm'
import { generateShareUrls } from '@/lib/share'
import { checkRateLimit } from '@/lib/rate-limit'
import { resultsCache } from '@/lib/cache'

const requestSchema = z.object({
  text: z.string().min(10).max(5000),
  mode: z.enum(['startup', 'dating', 'politics', 'everyday']).default('everyday'),
})

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
                request.headers.get('x-real-ip') || 
                'unknown'
    
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    // Parse and validate request
    const body = await request.json()
    const validation = requestSchema.safeParse(body)
    
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: validation.error.issues },
        { status: 400 }
      )
    }

    const { text, mode } = validation.data

    // Analyze text
    const analysis = analyzeText(text, mode as Mode)
    
    // Generate roast
    const roast = await generateRoast(
      text,
      mode,
      analysis.evidence,
      { ...analysis.scores, overall_vampire_score: analysis.overall_vampire_score },
      analysis.bucket
    )

    // Generate share URLs
    const share = generateShareUrls(
      text,
      mode,
      analysis.overall_vampire_score,
      analysis.bucket,
      roast,
      analysis.evidence
    )

    // Cache result (optional, for permalink)
    resultsCache.set(share.resultId, {
      mode,
      overall_vampire_score: analysis.overall_vampire_score,
      bucket: analysis.bucket,
      scores: analysis.scores as unknown as Record<string, number>,
      evidence: analysis.evidence,
      roast,
      timestamp: Date.now(),
    })

    // Return response
    return NextResponse.json({
      mode,
      overall_vampire_score: analysis.overall_vampire_score,
      bucket: analysis.bucket,
      scores: analysis.scores,
      evidence: analysis.evidence,
      roast,
      share,
    })
  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze text' },
      { status: 500 }
    )
  }
}