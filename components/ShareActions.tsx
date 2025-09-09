'use client'

interface ShareActionsProps {
  shareUrl: string
  cardPngUrl: string
  score: number
  roast: string
  bucket?: string
  mode?: string
  evidence?: string[]
}

export default function ShareActions({ shareUrl, cardPngUrl, score, roast, bucket = 'Unknown', mode = 'everyday', evidence = [] }: ShareActionsProps) {
  // Component now returns nothing since all share buttons have been removed
  return null
}