'use client'

import { useEffect, useState } from 'react'
import { Scores } from '@/lib/rubric'

interface SubscoreBarsProps {
  scores: Scores
}

const scoreLabels: Record<keyof Scores, string> = {
  buzzword_density: 'Buzzword Density',
  ego_inflation: 'Ego Inflation',
  resource_extractiveness: 'Resource Extraction',
  manipulative_tactics: 'Manipulation',
  vagueness_substance: 'Vagueness',
  tone_darkness: 'Dark Tone',
}

export default function SubscoreBars({ scores }: SubscoreBarsProps) {
  const [animated, setAnimated] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimated(true)
    }, 200)
    
    return () => clearTimeout(timer)
  }, [scores])

  const getBarColor = (score: number) => {
    if (score < 30) return 'bg-green-500'
    if (score < 50) return 'bg-yellow-500'
    if (score < 70) return 'bg-orange-500'
    return 'bg-red-500'
  }

  return (
    <div className="space-y-4 w-full max-w-2xl">
      <h3 className="text-xl font-serif font-bold text-blood-400 mb-4">Vampire Metrics</h3>
      {Object.entries(scores).map(([key, value]) => (
        <div key={key} className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-300">{scoreLabels[key as keyof Scores]}</span>
            <span className="text-gray-400 font-mono">{Math.round(value)}</span>
          </div>
          <div className="relative h-3 bg-charcoal-800 rounded-full overflow-hidden">
            <div
              className={`absolute inset-y-0 left-0 ${getBarColor(value)} transition-all duration-1000 ease-out rounded-full`}
              style={{
                width: animated ? `${value}%` : '0%',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}