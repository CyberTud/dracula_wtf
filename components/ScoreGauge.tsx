'use client'

import { useEffect, useState } from 'react'
import clsx from 'clsx'

interface ScoreGaugeProps {
  score: number
  bucket: string
}

export default function ScoreGauge({ score, bucket }: ScoreGaugeProps) {
  const [displayScore, setDisplayScore] = useState(0)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayScore(score)
    }, 100)
    
    return () => clearTimeout(timer)
  }, [score])

  const rotation = (displayScore / 100) * 180 - 90
  
  const bucketColors: Record<string, string> = {
    'Pure Soul': 'text-green-500',
    'Slight Fang': 'text-lime-500',
    'Opportunistic': 'text-yellow-500',
    'Thirsty': 'text-orange-500',
    'Ancient Vampire': 'text-red-600',
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-72 h-36 overflow-hidden">
        {/* Gauge background */}
        <div className="absolute inset-0 top-0">
          <div className="w-72 h-72 rounded-full border-8 border-charcoal-800"></div>
        </div>
        
        {/* Gauge fill */}
        <div className="absolute inset-0 top-0">
          <div 
            className="w-72 h-72 rounded-full gauge-gradient opacity-20"
            style={{
              clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)',
            }}
          ></div>
        </div>
        
        {/* Needle */}
        <div 
          className="absolute bottom-0 left-1/2 origin-bottom transition-transform duration-1000 ease-out"
          style={{
            transform: `translateX(-50%) rotate(${rotation}deg)`,
            height: '140px',
            width: '4px',
          }}
        >
          <div className="w-full h-full bg-blood-500 rounded-full shadow-lg shadow-blood-500/50"></div>
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-blood-500 rounded-full"></div>
        </div>
        
        {/* Center dot */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-6 bg-charcoal-900 rounded-full border-2 border-blood-500"></div>
        
        {/* Score display */}
        <div className="absolute inset-0 flex items-center justify-center -mt-8">
          <div className="text-center">
            <div className="text-6xl font-bold font-serif text-white text-shadow-blood transition-all duration-1000">
              {displayScore}
            </div>
          </div>
        </div>
      </div>
      
      {/* Bucket label */}
      <div className={clsx(
        'mt-4 text-2xl font-serif font-bold transition-colors duration-500',
        bucketColors[bucket] || 'text-red-600'
      )}>
        {bucket}
      </div>
      
      {/* Scale labels */}
      <div className="flex justify-between w-72 mt-2 text-xs text-gray-500">
        <span>0</span>
        <span>Pure</span>
        <span>50</span>
        <span>Thirsty</span>
        <span>100</span>
      </div>
    </div>
  )
}