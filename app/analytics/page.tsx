'use client'

import { usePageAnalytics } from '@/hooks/usePageAnalytics'
import { useState, useEffect } from 'react'
import type { AnalyticsStats } from '@/lib/analytics-store'

export default function AnalyticsPage() {
  usePageAnalytics()
  const [stats, setStats] = useState<AnalyticsStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/analytics/stats')
        if (!response.ok) throw new Error('Failed to fetch analytics')
        const data = await response.json()
        setStats(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load analytics')
      } finally {
        setLoading(false)
      }
    }
    
    // Fetch immediately
    fetchStats()
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchStats, 30000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center py-12">
          <div className="animate-spin text-4xl">⚡</div>
          <p className="text-gray-400 mt-4">Loading analytics...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center py-12">
          <div className="text-4xl mb-4">❌</div>
          <p className="text-red-400">{error}</p>
        </div>
      </div>
    )
  }

  if (!stats) return null

  // Format event names for display
  const formatEventName = (event: string) => {
    const eventMap: Record<string, string> = {
      'page_view': '👁️ Page viewed',
      'text_analyzed': '🩸 Text analyzed',
      'mode_changed': '⚙️ Mode changed',
      'share_action': '💾 Card downloaded',
      'analysis_error': '⚠️ Analysis error',
      'reset_analysis': '🔄 Analysis reset',
      'text_input': '✍️ Text entered'
    }
    return eventMap[event] || event
  }

  // Format time ago
  const timeAgo = (timestamp: string) => {
    const seconds = Math.floor((new Date().getTime() - new Date(timestamp).getTime()) / 1000)
    if (seconds < 60) return `${seconds}s ago`
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    return `${days}d ago`
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-serif font-bold text-blood-400 mb-2">
          Analytics Dashboard
        </h1>
        <p className="text-gray-400">
          Real-time vampire detection metrics (Last 30 days)
        </p>
        {stats.lastUpdated && (
          <p className="text-sm text-gray-500 mt-1">
            Updated: {new Date(stats.lastUpdated).toLocaleString()}
          </p>
        )}
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {/* Page Views */}
        <div className="bg-charcoal-900/80 backdrop-blur-sm border-2 border-charcoal-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-300">Page Views</h3>
            <span className="text-2xl">👁️</span>
          </div>
          <p className="text-3xl font-bold text-blood-400">
            {stats.pageViews.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 mt-2">Total page visits</p>
        </div>

        {/* Texts Analyzed */}
        <div className="bg-charcoal-900/80 backdrop-blur-sm border-2 border-charcoal-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-300">Texts Analyzed</h3>
            <span className="text-2xl">🩸</span>
          </div>
          <p className="text-3xl font-bold text-blood-400">
            {stats.textsAnalyzed.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 mt-2">Vampire detections run</p>
        </div>

        {/* Average Score */}
        <div className="bg-charcoal-900/80 backdrop-blur-sm border-2 border-charcoal-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-300">Average Score</h3>
            <span className="text-2xl">🦇</span>
          </div>
          <p className="text-3xl font-bold text-blood-400">
            {stats.averageScore}%
          </p>
          <p className="text-sm text-gray-500 mt-2">Mean vampire score</p>
        </div>

        {/* Downloads */}
        <div className="bg-charcoal-900/80 backdrop-blur-sm border-2 border-charcoal-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-300">Card Downloads</h3>
            <span className="text-2xl">💾</span>
          </div>
          <p className="text-3xl font-bold text-blood-400">
            {stats.downloadCount.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 mt-2">Cards downloaded</p>
        </div>

        {/* Error Rate */}
        <div className="bg-charcoal-900/80 backdrop-blur-sm border-2 border-charcoal-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-300">Error Rate</h3>
            <span className="text-2xl">⚠️</span>
          </div>
          <p className="text-3xl font-bold text-blood-400">
            {stats.errorRate.toFixed(1)}%
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {stats.errorCount} errors total
          </p>
        </div>

        {/* Success Rate */}
        <div className="bg-charcoal-900/80 backdrop-blur-sm border-2 border-charcoal-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-300">Success Rate</h3>
            <span className="text-2xl">✅</span>
          </div>
          <p className="text-3xl font-bold text-green-400">
            {(100 - stats.errorRate).toFixed(1)}%
          </p>
          <p className="text-sm text-gray-500 mt-2">Successful analyses</p>
        </div>
      </div>

      {/* Mode Distribution */}
      {stats.popularModes.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-serif font-bold text-blood-400 mb-6">
            Analysis Modes
          </h2>
          <div className="bg-charcoal-900/80 backdrop-blur-sm border-2 border-charcoal-700 rounded-xl p-6">
            <div className="space-y-4">
              {stats.popularModes.map(({ mode, count }) => {
                const percentage = stats.textsAnalyzed > 0 
                  ? (count / stats.textsAnalyzed * 100).toFixed(1)
                  : '0'
                return (
                  <div key={mode}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300 capitalize">{mode}</span>
                      <span className="text-gray-400">
                        {count} ({percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-charcoal-800 rounded-full h-2">
                      <div 
                        className="bg-blood-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Score Distribution */}
      {stats.scoreDistribution.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-serif font-bold text-blood-400 mb-6">
            Score Distribution
          </h2>
          <div className="bg-charcoal-900/80 backdrop-blur-sm border-2 border-charcoal-700 rounded-xl p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.scoreDistribution.map(({ bucket, count }) => (
                <div key={bucket} className="text-center">
                  <div className="text-2xl mb-2">
                    {bucket === 'Innocent Human' && '😇'}
                    {bucket === 'Slightly Sus' && '🤔'}
                    {bucket === 'Vampire Tendencies' && '🧛'}
                    {bucket === 'Full Bloodsucker' && '🩸'}
                  </div>
                  <p className="text-sm text-gray-400">{bucket}</p>
                  <p className="text-xl font-bold text-blood-400">{count}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Daily Activity Chart */}
      {stats.dailyStats.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-serif font-bold text-blood-400 mb-6">
            7-Day Activity
          </h2>
          <div className="bg-charcoal-900/80 backdrop-blur-sm border-2 border-charcoal-700 rounded-xl p-6">
            <div className="grid grid-cols-7 gap-2">
              {stats.dailyStats.map(({ date, analyses, views }) => {
                const maxActivity = Math.max(
                  ...stats.dailyStats.map(d => d.analyses + d.views),
                  1
                )
                const height = ((analyses + views) / maxActivity) * 100
                return (
                  <div key={date} className="flex flex-col items-center">
                    <div className="relative w-full h-32 flex items-end">
                      <div 
                        className="w-full bg-blood-600/50 rounded-t transition-all duration-500"
                        style={{ height: `${height}%` }}
                        title={`${analyses} analyses, ${views} views`}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(date).toLocaleDateString('en', { weekday: 'short' })}
                    </p>
                    <p className="text-xs text-gray-600">
                      {new Date(date).getDate()}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Recent Events */}
      <div>
        <h2 className="text-2xl font-serif font-bold text-blood-400 mb-6">
          Recent Activity
        </h2>
        <div className="bg-charcoal-900/80 backdrop-blur-sm border-2 border-charcoal-700 rounded-xl p-6">
          {stats.recentEvents.length > 0 ? (
            <div className="space-y-3">
              {stats.recentEvents.map((event) => (
                <div 
                  key={event.id} 
                  className="flex items-center justify-between py-2 border-b border-charcoal-700 last:border-0"
                >
                  <div className="flex-1">
                    <span className="text-gray-300">
                      {formatEventName(event.event)}
                    </span>
                    {event.properties && (
                      <span className="text-gray-500 text-sm ml-2">
                        {event.properties.mode && ` (${event.properties.mode})`}
                        {event.properties.score !== undefined && ` - Score: ${event.properties.score}%`}
                        {event.properties.bucket && ` - ${event.properties.bucket}`}
                        {event.properties.error && ` - ${event.properties.error}`}
                      </span>
                    )}
                  </div>
                  <span className="text-gray-500 text-sm ml-4">
                    {timeAgo(event.timestamp)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              No events recorded yet. Start analyzing some text!
            </p>
          )}
        </div>
      </div>
    </div>
  )
}