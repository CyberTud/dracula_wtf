import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    const score = parseInt(searchParams.get('score') || '0')
    const bucket = searchParams.get('bucket') || 'Unknown'
    const mode = searchParams.get('mode') || 'everyday'
    const roast = searchParams.get('roast') || 'No roast available'
    const evidence = searchParams.get('evidence') || ''
    
    const getScoreColor = (score: number) => {
      return '#dc2626' // Always red
    }

    const color = getScoreColor(score)
    const vampireQuote = evidence || "something suspiciously vampiric"

    // Get the dracula image URL
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000'
    const draculaImageUrl = `${baseUrl}/dracula.png`

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#000000',
            backgroundImage: 'linear-gradient(to bottom, #000000, #1a0000)',
            color: 'white',
            fontFamily: 'Impact, sans-serif',
            position: 'relative',
          }}
        >
          {/* Top meme text */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '30px 20px 10px',
              height: '100px',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                fontSize: '42px',
                fontWeight: 900,
                textTransform: 'uppercase',
                color: 'white',
                textAlign: 'center',
                textShadow: '2px 2px 0px #000',
                letterSpacing: '0.5px',
                lineHeight: 1.1,
                maxWidth: '1000px',
              }}
            >
              ME: "{vampireQuote.substring(0, 40)}"
            </div>
          </div>

          {/* Center - Dracula and Score */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '350px',
              gap: '15px',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '50px',
              }}
            >
              <img 
                src={draculaImageUrl}
                alt="Dracula"
                width={180}
                height={180}
                style={{
                  objectFit: 'contain',
                }}
              />
              
              {/* Score next to Dracula */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    fontSize: '90px',
                    fontWeight: 900,
                    color: color,
                    lineHeight: 1,
                    textShadow: `0 0 20px ${color}`,
                  }}
                >
                  {score}
                </div>
                <div
                  style={{
                    display: 'flex',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    marginTop: '5px',
                    textTransform: 'uppercase',
                    color: '#dc2626',
                  }}
                >
                  Vampire Points
                </div>
              </div>
            </div>
            
            {/* Website name in the middle */}
            <div
              style={{
                display: 'flex',
                fontSize: '28px',
                fontWeight: 900,
                color: '#dc2626',
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                letterSpacing: '2px',
              }}
            >
              DRACULA.WTF
            </div>
          </div>

          {/* Bottom meme text with roast */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '180px',
              padding: '10px 20px',
              gap: '8px',
            }}
          >
            <div
              style={{
                display: 'flex',
                fontSize: '18px',
                fontWeight: 600,
                color: '#facc15',
                textAlign: 'center',
                maxWidth: '850px',
                fontStyle: 'italic',
                lineHeight: 1.3,
                padding: '0 20px',
              }}
            >
              "{roast.substring(0, 140)}..."
            </div>
            <div
              style={{
                display: 'flex',
                fontSize: '38px',
                fontWeight: 900,
                textTransform: 'uppercase',
                color: '#dc2626',
                textAlign: 'center',
                textShadow: '2px 2px 0px #000',
                letterSpacing: '0.5px',
              }}
            >
              YOU ARE A {bucket === 'Slight Fang' ? 'BLOODSUCKER' : bucket.toUpperCase() + ' BLOODSUCKER'}
            </div>
          </div>

        </div>
      ),
      {
        width: 1200,
        height: 630,
        headers: {
          'Content-Type': 'image/png',
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      }
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}