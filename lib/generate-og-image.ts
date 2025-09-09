import sharp from 'sharp'

export async function generateOGImage(params: {
  score: number
  bucket: string
  mode: string
  roast: string
  evidence: string
}) {
  const { score, bucket, roast } = params
  
  // Create SVG with the content
  const svg = `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#0a0a0a;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1a0000;stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <!-- Background -->
      <rect width="1200" height="630" fill="url(#bg)"/>
      
      <!-- Border -->
      <rect x="20" y="20" width="1160" height="590" fill="none" stroke="#991b1b" stroke-width="2" rx="10"/>
      
      <!-- Title -->
      <text x="600" y="80" font-family="serif" font-size="48" font-weight="bold" fill="#dc2626" text-anchor="middle">
        Vampire Detection Report
      </text>
      
      <!-- Score Circle -->
      <circle cx="600" cy="250" r="100" fill="none" stroke="#991b1b" stroke-width="4"/>
      <text x="600" y="240" font-family="sans-serif" font-size="72" font-weight="bold" fill="#dc2626" text-anchor="middle">
        ${score}%
      </text>
      <text x="600" y="280" font-family="sans-serif" font-size="24" fill="#f87171" text-anchor="middle">
        Vampire Score
      </text>
      
      <!-- Bucket -->
      <rect x="400" y="380" width="400" height="60" fill="#1a0000" stroke="#991b1b" stroke-width="2" rx="8"/>
      <text x="600" y="420" font-family="sans-serif" font-size="32" font-weight="bold" fill="#f87171" text-anchor="middle">
        ${bucket}
      </text>
      
      <!-- Roast (truncated) -->
      <text x="600" y="500" font-family="sans-serif" font-size="18" fill="#d1d5db" text-anchor="middle">
        ${roast.substring(0, 80)}${roast.length > 80 ? '...' : ''}
      </text>
      
      <!-- Footer -->
      <text x="600" y="580" font-family="sans-serif" font-size="24" fill="#991b1b" text-anchor="middle">
        dracula.wtf
      </text>
    </svg>
  `
  
  // Convert SVG to PNG using sharp
  const buffer = await sharp(Buffer.from(svg))
    .png()
    .toBuffer()
  
  return buffer
}