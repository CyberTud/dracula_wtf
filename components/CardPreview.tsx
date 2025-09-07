'use client'

interface CardPreviewProps {
  score: number
  bucket: string
  mode: string
  roast: string
  evidence?: string[]
}

export default function CardPreview({ score, bucket, mode, roast, evidence = [] }: CardPreviewProps) {
  const getScoreColor = (score: number) => {
    return '#dc2626' // Always red
  }

  const color = getScoreColor(score)
  const vampireQuote = evidence[0] || "something suspiciously vampiric"

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h3 className="text-xl font-serif font-bold text-center text-blood-400 mb-4">
        Your Meme Card
      </h3>
      <div 
        className="relative overflow-hidden rounded-2xl shadow-2xl"
        style={{ 
          aspectRatio: '1200 / 630',
          background: 'linear-gradient(to bottom, #000000, #1a0000)'
        }}
      >
        {/* Classic meme format */}
        <div className="relative h-full flex flex-col text-white">
          
          {/* Top meme text */}
          <div className="text-center py-6 px-4">
            <div 
              className="text-2xl md:text-4xl font-black uppercase tracking-wide"
              style={{ 
                textShadow: '2px 2px 0px #000, -1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000' 
              }}
            >
              ME: &ldquo;{vampireQuote.substring(0, 50)}&rdquo;
            </div>
          </div>

          {/* Center - Dracula and Score with website name */}
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            <div className="flex items-center justify-center gap-8 md:gap-12">
              <img 
                src="/dracula.png" 
                alt="Dracula" 
                className="w-36 h-36 md:w-44 md:h-44 object-contain"
              />
              
              {/* Score next to Dracula */}
              <div className="flex flex-col items-center">
                <div 
                  className="text-7xl md:text-8xl font-black"
                  style={{ 
                    color: '#dc2626',
                    textShadow: `0 0 30px #dc2626`,
                  }}
                >
                  {score}
                </div>
                <div className="text-sm md:text-base font-bold mt-1 uppercase text-red-600">
                  Vampire Points
                </div>
              </div>
            </div>
            
            {/* Website name in the middle */}
            <div 
              className="text-2xl md:text-3xl font-black tracking-wider"
              style={{ 
                color: '#dc2626',
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
              }}
            >
              DRACULA.WTF
            </div>
          </div>

          {/* Bottom text with roast */}
          <div className="text-center py-6 px-4 space-y-3">
            <div className="text-sm md:text-base italic text-yellow-400 max-w-3xl mx-auto px-4">
              &ldquo;{roast}&rdquo;
            </div>
            <div 
              className="text-xl md:text-2xl font-black uppercase"
              style={{ 
                color: '#dc2626',
                textShadow: '2px 2px 0px #000'
              }}
            >
              YOU ARE A {bucket === 'Slight Fang' ? 'BLOODSUCKER' : bucket.toUpperCase() + ' BLOODSUCKER'}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}