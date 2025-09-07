import { generateResultId, generateShareToken } from './hash'

export interface ShareData {
  resultId: string
  cardPngUrl: string
  ogUrl: string
  permalink: string
}

export function generateShareUrls(
  text: string,
  mode: string,
  score: number,
  bucket: string,
  roast: string,
  evidence: string[] = []
): ShareData {
  const resultId = generateResultId(text)
  const token = generateShareToken(resultId, score)
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000'
  
  const params = new URLSearchParams({
    id: resultId,
    score: score.toString(),
    bucket: bucket,
    mode: mode,
    roast: roast.substring(0, 140),
    evidence: evidence[0] || '',
    token: token,
  })
  
  return {
    resultId,
    cardPngUrl: `${baseUrl}/api/card.png?${params.toString()}`,
    ogUrl: `${baseUrl}/og?${params.toString()}`,
    permalink: `${baseUrl}/r/${resultId}`,
  }
}