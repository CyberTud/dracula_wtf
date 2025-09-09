'use client'

import { usePageAnalytics } from '@/hooks/usePageAnalytics'
import { useState, useEffect } from 'react'

interface AnalyticsData {
  pageViews: number
  textsAnalyzed: number
  averageScore: number
  popularMode: string
  downloadCount: number
  errorRate: number
  lastUpdated: string
}

export default function AnalyticsPage() {
  usePageAnalytics()
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real implementation, this would fetch from your analytics API
    // For now, we'll show placeholder data to demonstrate the structure
    const fetchAnalytics = async () => {
      try {
        // Simulated data - replace with actual API call
        setData({
          pageViews: 1542,
          textsAnalyzed: 487,
          averageScore: 65,
          popularMode: 'everyday',
          downloadCount: 123,
          errorRate: 2.3,
          lastUpdated: new Date().toISOString()
        })
      } finally {
        setLoading(false)
      }
    }
    
    fetchAnalytics()
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

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-serif font-bold text-blood-400 mb-2">
          Analytics Dashboard
        </h1>
        <p className="text-gray-400">
          Track vampire detection metrics and user engagement
        </p>
      </div>

      {data && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Page Views */}
          <div className="bg-charcoal-900/80 backdrop-blur-sm border-2 border-charcoal-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-300">Page Views</h3>
              <span className="text-2xl">👁️</span>
            </div>
            <p className="text-3xl font-bold text-blood-400">
              {data.pageViews.toLocaleString()}
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
              {data.textsAnalyzed.toLocaleString()}
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
              {data.averageScore}%
            </p>
            <p className="text-sm text-gray-500 mt-2">Mean vampire score</p>
          </div>

          {/* Popular Mode */}
          <div className="bg-charcoal-900/80 backdrop-blur-sm border-2 border-charcoal-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-300">Popular Mode</h3>
              <span className="text-2xl">⚙️</span>
            </div>
            <p className="text-3xl font-bold text-blood-400 capitalize">
              {data.popularMode}
            </p>
            <p className="text-sm text-gray-500 mt-2">Most used analysis mode</p>
          </div>

          {/* Downloads */}
          <div className="bg-charcoal-900/80 backdrop-blur-sm border-2 border-charcoal-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-300">Card Downloads</h3>
              <span className="text-2xl">💾</span>
            </div>
            <p className="text-3xl font-bold text-blood-400">
              {data.downloadCount.toLocaleString()}
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
              {data.errorRate.toFixed(1)}%
            </p>
            <p className="text-sm text-gray-500 mt-2">Analysis failures</p>
          </div>
        </div>
      )}

      {/* Events Log */}
      <div className="mt-12">
        <h2 className="text-2xl font-serif font-bold text-blood-400 mb-6">
          Recent Events
        </h2>
        <div className="bg-charcoal-900/80 backdrop-blur-sm border-2 border-charcoal-700 rounded-xl p-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-charcoal-700">
              <span className="text-gray-300">Text analyzed (everyday mode)</span>
              <span className="text-gray-500 text-sm">2 min ago</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-charcoal-700">
              <span className="text-gray-300">Card downloaded</span>
              <span className="text-gray-500 text-sm">5 min ago</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-charcoal-700">
              <span className="text-gray-300">Mode changed: everyday → business</span>
              <span className="text-gray-500 text-sm">7 min ago</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-charcoal-700">
              <span className="text-gray-300">Analysis error: Text too short</span>
              <span className="text-gray-500 text-sm">12 min ago</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-300">Page view: /</span>
              <span className="text-gray-500 text-sm">15 min ago</span>
            </div>
          </div>
        </div>
      </div>

      {/* Note about Vercel Analytics */}
      <div className="mt-8 p-4 bg-charcoal-900/50 border border-charcoal-700 rounded-lg">
        <p className="text-sm text-gray-400">
          <span className="text-blood-400 font-semibold">Note:</span> This page shows a preview of analytics data structure. 
          For production metrics, view your{' '}
          <a 
            href="https://vercel.com/analytics" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blood-400 hover:text-blood-300 underline"
          >
            Vercel Analytics Dashboard
          </a>
          {' '}where all tracked events are collected and visualized.
        </p>
      </div>
    </div>
  )
}