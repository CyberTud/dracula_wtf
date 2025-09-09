'use client'

import { useState, useEffect } from 'react'
import ModeSelect from '@/components/ModeSelect'
import ScoreGauge from '@/components/ScoreGauge'
import SubscoreBars from '@/components/SubscoreBars'
import RoastBlock from '@/components/RoastBlock'
import EvidenceList from '@/components/EvidenceList'
import LoadingSpinner from '@/components/LoadingSpinner'
import CardPreview from '@/components/CardPreview'
import { Mode } from '@/lib/rubric'
import { analyticsEvents } from '@/lib/analytics'
import { usePageAnalytics } from '@/hooks/usePageAnalytics'
import clsx from 'clsx'

interface AnalysisResult {
  mode: string
  overall_vampire_score: number
  bucket: string
  scores: Record<string, number>
  evidence: string[]
  roast: string
  share: {
    resultId: string
    cardPngUrl: string
    ogUrl: string
    permalink: string
  }
}

export default function HomePage() {
  usePageAnalytics()
  
  const [text, setText] = useState('')
  const [mode, setMode] = useState<Mode>('everyday')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [previousMode, setPreviousMode] = useState<Mode>('everyday')

  const handleAnalyze = async () => {
    if (text.trim().length < 10) {
      setError('Please enter at least 10 characters to analyze.')
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, mode }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Analysis failed')
      }

      const data = await response.json()
      setResult(data)
      
      // Track successful analysis
      analyticsEvents.textAnalyzed(
        mode,
        text.length,
        data.overall_vampire_score,
        data.bucket
      )
      analyticsEvents.resultViewed(data.overall_vampire_score, data.bucket)
    } catch (err) {
      console.error('Analysis error:', err)
      const errorMessage = err instanceof Error ? err.message : 'Failed to analyze text. Please try again.'
      setError(errorMessage)
      analyticsEvents.analysisError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setText('')
    setResult(null)
    setError(null)
    analyticsEvents.resetAnalysis()
  }
  
  // Track mode changes
  useEffect(() => {
    if (mode !== previousMode) {
      analyticsEvents.modeChanged(previousMode, mode)
      setPreviousMode(mode)
    }
  }, [mode, previousMode])
  
  // Track text input (debounced)
  useEffect(() => {
    if (text.length > 0) {
      const timer = setTimeout(() => {
        analyticsEvents.textInput(text.length)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [text])

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="inline-block animate-bat-fly mb-4">
          <span className="text-4xl" role="img" aria-label="bat">🦇</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-blood-400 mb-4 text-shadow-blood">
          Bloodsucker Detector
        </h1>
        <p className="text-xl text-gray-300">
          Paste any text to reveal its vampiric nature
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Bios • Pitches • Tweets • DMs • Ads • Speeches
        </p>
      </div>

      {!result ? (
        <div className="space-y-6">
          {/* Mode Selection */}
          <div className="flex justify-center">
            <ModeSelect value={mode} onChange={setMode} />
          </div>

          {/* Text Input */}
          <div className="relative">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste the text you want to analyze for vampiric behavior..."
              className={clsx(
                'w-full h-64 p-6 rounded-xl',
                'bg-charcoal-900/80 backdrop-blur-sm',
                'border-2 transition-colors duration-200',
                error
                  ? 'border-red-500'
                  : 'border-charcoal-700 focus:border-blood-600',
                'text-gray-100 placeholder-gray-500',
                'resize-none focus:outline-none focus:ring-2 focus:ring-blood-600/20',
                'font-sans text-lg'
              )}
              aria-label="Text to analyze"
              maxLength={5000}
            />
            <div className="absolute bottom-4 right-4 text-sm text-gray-500">
              {text.length} / 5000
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-900/20 border border-red-500 rounded-lg text-red-400" role="alert">
              {error}
            </div>
          )}

          {/* Analyze Button */}
          <div className="flex justify-center">
            <button
              onClick={handleAnalyze}
              disabled={loading || text.trim().length < 10}
              className={clsx(
                'px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200',
                'flex items-center gap-3',
                loading || text.trim().length < 10
                  ? 'bg-charcoal-800 text-gray-500 cursor-not-allowed'
                  : 'bg-blood-600 text-white hover:bg-blood-700 hover:shadow-xl hover:shadow-blood-600/30 hover:scale-105'
              )}
              aria-label="Analyze text"
            >
              {loading ? (
                <>
                  <span className="animate-spin">⚡</span>
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <span>🩸</span>
                  <span>Analyze for Vampirism</span>
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-12" role="region" aria-live="polite" aria-label="Analysis results">
          {/* Results Section */}
          <div className="flex justify-center">
            <ScoreGauge score={result.overall_vampire_score} bucket={result.bucket} />
          </div>

          {/* Roast */}
          <RoastBlock roast={result.roast} />

          {/* Card Preview */}
          <CardPreview 
            score={result.overall_vampire_score}
            bucket={result.bucket}
            mode={result.mode}
            roast={result.roast}
            evidence={result.evidence}
          />

          {/* Subscores */}
          <div className="flex justify-center">
            <SubscoreBars scores={result.scores as any} />
          </div>

          {/* Evidence */}
          {result.evidence.length > 0 && (
            <div className="flex justify-center">
              <EvidenceList evidence={result.evidence} />
            </div>
          )}


          {/* Reset Button */}
          <div className="flex justify-center pt-8">
            <button
              onClick={handleReset}
              className="px-6 py-3 rounded-lg font-medium transition-all duration-200 bg-charcoal-800 border-2 border-charcoal-700 text-gray-300 hover:border-blood-600/50 hover:text-white"
              aria-label="Analyze another text"
            >
              🔄 Analyze Another Text
            </button>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <LoadingSpinner />
        </div>
      )}
    </div>
  )
}