import crypto from 'crypto'

export function generateResultId(text: string, timestamp: number = Date.now()): string {
  const hash = crypto
    .createHash('sha256')
    .update(`${text}-${timestamp}`)
    .digest('hex')
  
  return hash.substring(0, 8)
}

export function generateShareToken(resultId: string, score: number): string {
  const data = `${resultId}-${score}-${process.env.BASE_URL || 'dracula.wtf'}`
  const hash = crypto
    .createHash('sha256')
    .update(data)
    .digest('hex')
  
  return hash.substring(0, 16)
}