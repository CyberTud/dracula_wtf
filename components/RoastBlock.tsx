'use client'

import { useState } from 'react'
import clsx from 'clsx'

interface RoastBlockProps {
  roast: string
}

export default function RoastBlock({ roast }: RoastBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(roast)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-blood-600/20 to-blood-800/20 blur-xl"></div>
      <div className="relative bg-charcoal-900/80 backdrop-blur-sm border-2 border-blood-600/30 rounded-xl p-8 blood-glow">
        <div className="absolute -top-4 -left-4 text-6xl opacity-20 text-blood-600">&ldquo;</div>
        <div className="absolute -bottom-4 -right-4 text-6xl opacity-20 text-blood-600 rotate-180">&rdquo;</div>
        
        <p className="text-2xl md:text-3xl font-serif leading-relaxed text-gray-100 italic text-center">
          {roast}
        </p>
        
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleCopy}
            className={clsx(
              'px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium',
              copied
                ? 'bg-green-600 text-white'
                : 'bg-charcoal-800 text-gray-300 hover:bg-charcoal-700 hover:text-white'
            )}
            aria-label="Copy roast to clipboard"
          >
            {copied ? '✓ Copied!' : '📋 Copy Roast'}
          </button>
        </div>
        
        <div className="mt-4 text-center text-blood-400 font-serif text-lg">
          — Count Dracula
        </div>
      </div>
    </div>
  )
}