'use client'

import { useState } from 'react'
import clsx from 'clsx'

interface ShareActionsProps {
  shareUrl: string
  cardPngUrl: string
  score: number
  roast: string
  bucket?: string
  mode?: string
  evidence?: string[]
}

export default function ShareActions({ shareUrl, cardPngUrl, score, roast, bucket = 'Unknown', mode = 'everyday', evidence = [] }: ShareActionsProps) {
  const [copied, setCopied] = useState(false)
  const [downloading, setDownloading] = useState(false)

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleDownload = async () => {
    try {
      setDownloading(true)
      
      // Build the image URL with parameters
      const params = new URLSearchParams({
        score: score.toString(),
        bucket: bucket,
        mode: mode,
        roast: roast.substring(0, 200),
        evidence: evidence[0] || ''
      })
      
      const imageUrl = `/api/card.png?${params.toString()}`
      
      // Fetch the image
      const response = await fetch(imageUrl)
      if (!response.ok) throw new Error('Failed to fetch image')
      
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      
      // Create and trigger download
      const a = document.createElement('a')
      a.href = url
      a.download = `vampire-score-${score}.png`
      a.click()
      
      // Cleanup
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download failed:', error)
    } finally {
      setDownloading(false)
    }
  }


  return (
    <div className="flex flex-wrap justify-center gap-3">
      <button
        onClick={handleCopyLink}
        className={clsx(
          'px-6 py-3 rounded-lg transition-all duration-200 font-medium flex items-center gap-2',
          copied
            ? 'bg-green-600 text-white'
            : 'bg-charcoal-800 border-2 border-charcoal-700 text-gray-300 hover:border-blood-600/50 hover:text-white'
        )}
        aria-label="Copy share link"
      >
        <span className="text-lg">🔗</span>
        <span>{copied ? 'Copied!' : 'Copy Link'}</span>
      </button>

      <button
        onClick={handleDownload}
        disabled={downloading}
        className={clsx(
          'px-6 py-3 rounded-lg transition-all duration-200 font-medium flex items-center gap-2',
          'bg-charcoal-800 border-2 border-charcoal-700 text-gray-300',
          downloading
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:border-blood-600/50 hover:text-white'
        )}
        aria-label="Download card image"
      >
        <span className="text-lg">💾</span>
        <span>{downloading ? 'Downloading...' : 'Download Card'}</span>
      </button>

    </div>
  )
}