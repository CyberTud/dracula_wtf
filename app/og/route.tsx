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
    

    const bucketColors: Record<string, string> = {
      'Pure Soul': '#22c55e',
      'Slight Fang': '#84cc16',
      'Opportunistic': '#eab308',
      'Thirsty': '#f97316',
      'Ancient Vampire': '#dc2626',
    }

    const bucketEmojis: Record<string, string> = {
      'Pure Soul': '😇',
      'Slight Fang': '😈',
      'Opportunistic': '🤑',
      'Thirsty': '🩸',
      'Ancient Vampire': '🧛',
    }

    const bgColor = bucketColors[bucket] || '#dc2626'
    const emoji = bucketEmojis[bucket] || '🦇'

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#0a0a0a',
            backgroundImage: `linear-gradient(135deg, #0a0a0a 0%, #2d0f0f 100%)`,
            position: 'relative',
          }}
        >
          {/* Top meme text style */}
          <div
            style={{
              position: 'absolute',
              top: '40px',
              left: '0',
              right: '0',
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                backgroundColor: 'rgba(0,0,0,0.8)',
                padding: '10px 30px',
                borderRadius: '10px',
                border: '3px solid white',
              }}
            >
              <div
                style={{
                  fontSize: '36px',
                  fontWeight: 'bold',
                  color: 'white',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  fontFamily: 'sans-serif',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                }}
              >
                YOU SAID: &quot;{evidence ? evidence.substring(0, 60) + '...' : 'SOMETHING VAMPIRIC'}&quot;
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              padding: '100px 60px 60px',
            }}
          >
            {/* Giant score and emoji */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '30px',
                marginBottom: '30px',
              }}
            >
              <div
                style={{
                  fontSize: '200px',
                  fontWeight: 'bold',
                  color: bgColor,
                  textShadow: `0 0 80px ${bgColor}, 0 0 40px ${bgColor}`,
                  fontFamily: 'serif',
                }}
              >
                {score}
              </div>
              <div style={{ fontSize: '120px' }}>
                {emoji}
              </div>
            </div>
            
            {/* Bucket label as a big stamp */}
            <div
              style={{
                transform: 'rotate(-5deg)',
                marginBottom: '40px',
              }}
            >
              <div
                style={{
                  backgroundColor: bgColor,
                  color: 'black',
                  padding: '20px 50px',
                  fontSize: '42px',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  letterSpacing: '4px',
                  fontFamily: 'sans-serif',
                  border: '6px solid black',
                  boxShadow: '10px 10px 0px rgba(0,0,0,0.5)',
                }}
              >
                {bucket}
              </div>
            </div>

            {/* Roast in meme font style */}
            <div
              style={{
                backgroundColor: 'white',
                color: 'black',
                padding: '30px',
                borderRadius: '20px',
                maxWidth: '900px',
                textAlign: 'center',
                position: 'relative',
                boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
              }}
            >
              <div
                style={{
                  fontSize: '28px',
                  fontWeight: 'bold',
                  lineHeight: '1.4',
                  fontFamily: 'sans-serif',
                }}
              >
                &quot;{roast.substring(0, 120)}{roast.length > 120 ? '...' : ''}&quot;
              </div>
              <div
                style={{
                  fontSize: '20px',
                  marginTop: '15px',
                  color: '#666',
                  fontStyle: 'italic',
                }}
              >
                — Dracula, probably
              </div>
            </div>
          </div>

          {/* Bottom meme bar */}
          <div
            style={{
              position: 'absolute',
              bottom: '0',
              left: '0',
              right: '0',
              backgroundColor: bgColor,
              padding: '20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
              }}
            >
              <span style={{ fontSize: '50px' }}>🦇</span>
              <div
                style={{
                  fontSize: '36px',
                  fontWeight: 'bold',
                  color: 'black',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  fontFamily: 'sans-serif',
                }}
              >
                dracula.wtf
              </div>
            </div>
            <div
              style={{
                fontSize: '24px',
                color: 'black',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                fontFamily: 'sans-serif',
              }}
            >
              {mode} MODE 💀
            </div>
          </div>

          {/* Bottom text */}
          <div
            style={{
              position: 'absolute',
              bottom: '80px',
              left: '0',
              right: '0',
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                padding: '8px 20px',
                borderRadius: '8px',
                border: '2px solid rgba(255,255,255,0.3)',
              }}
            >
              <div
                style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: 'white',
                  textTransform: 'uppercase',
                  fontFamily: 'sans-serif',
                }}
              >
                VAMPIRE SCORE: {score}/100
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}