import sharp from 'sharp'
import fs from 'fs/promises'
import path from 'path'

export async function generateCardImage(params: {
  score: number
  bucket: string
  mode: string
  roast: string
  evidence: string
}) {
  const { score, bucket, roast, evidence } = params
  
  const vampireQuote = evidence || "something suspiciously vampiric"
  const bottomText = bucket === 'Slight Fang' ? 'BLOODSUCKER' : bucket.toUpperCase() + ' BLOODSUCKER'
  
  // Create SVG with the meme-style content
  const svg = `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#000000;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1a0000;stop-opacity:1" />
        </linearGradient>
        <filter id="textShadow">
          <feDropShadow dx="2" dy="2" stdDeviation="0" flood-color="#000000"/>
        </filter>
        <filter id="glow">
          <feGaussianBlur stdDeviation="10" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <!-- Background -->
      <rect width="1200" height="630" fill="url(#bg)"/>
      
      <!-- Top meme text -->
      <text x="600" y="70" 
        font-family="Impact, Arial Black, sans-serif" 
        font-size="42" 
        font-weight="900" 
        fill="white" 
        text-anchor="middle"
        filter="url(#textShadow)"
        style="text-transform: uppercase; letter-spacing: 0.5px;">
        ME: "${vampireQuote.substring(0, 40)}"
      </text>
      
      <!-- Center Section -->
      <!-- Dracula emoji placeholder -->
      <text x="450" y="300" 
        font-size="120" 
        text-anchor="middle">
        🧛
      </text>
      
      <!-- Score -->
      <text x="750" y="280" 
        font-family="Impact, Arial Black, sans-serif" 
        font-size="90" 
        font-weight="900" 
        fill="#dc2626" 
        text-anchor="middle"
        filter="url(#glow)">
        ${score}
      </text>
      <text x="750" y="310" 
        font-family="Arial, sans-serif" 
        font-size="18" 
        font-weight="bold" 
        fill="#dc2626" 
        text-anchor="middle"
        style="text-transform: uppercase;">
        Vampire Points
      </text>
      
      <!-- Website name -->
      <text x="600" y="380" 
        font-family="Impact, Arial Black, sans-serif" 
        font-size="28" 
        font-weight="900" 
        fill="#dc2626" 
        text-anchor="middle"
        filter="url(#textShadow)"
        style="letter-spacing: 2px;">
        DRACULA.WTF
      </text>
      
      <!-- Roast quote -->
      <text x="600" y="470" 
        font-family="Arial, sans-serif" 
        font-size="18" 
        font-weight="600" 
        fill="#facc15" 
        text-anchor="middle"
        font-style="italic">
        "${roast.substring(0, 70)}..."
      </text>
      
      <!-- Bottom meme text -->
      <text x="600" y="550" 
        font-family="Impact, Arial Black, sans-serif" 
        font-size="38" 
        font-weight="900" 
        fill="#dc2626" 
        text-anchor="middle"
        filter="url(#textShadow)"
        style="text-transform: uppercase; letter-spacing: 0.5px;">
        YOU ARE A ${bottomText}
      </text>
    </svg>
  `
  
  // Try to composite with actual dracula image if available
  try {
    const draculaPath = path.join(process.cwd(), 'public', 'dracula.png')
    const draculaBuffer = await fs.readFile(draculaPath)
    
    // Create base image from SVG
    const baseImage = await sharp(Buffer.from(svg))
      .png()
      .toBuffer()
    
    // Composite dracula image onto the base
    const finalImage = await sharp(baseImage)
      .composite([{
        input: await sharp(draculaBuffer)
          .resize(180, 180)
          .toBuffer(),
        left: 360,
        top: 200
      }])
      .png()
      .toBuffer()
    
    return finalImage
  } catch (error) {
    // If dracula image not found, return SVG version with emoji
    console.log('Using emoji version - dracula.png not found')
    return await sharp(Buffer.from(svg))
      .png()
      .toBuffer()
  }
}