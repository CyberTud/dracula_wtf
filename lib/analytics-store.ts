import fs from 'fs/promises'
import path from 'path'

export interface AnalyticsEvent {
  id: string
  event: string
  properties?: Record<string, any>
  timestamp: string
  sessionId?: string
  userAgent?: string
}

export interface AnalyticsStats {
  pageViews: number
  textsAnalyzed: number
  totalAnalyses: { mode: string; count: number }[]
  averageScore: number
  scoreDistribution: { bucket: string; count: number }[]
  downloadCount: number
  errorCount: number
  errorRate: number
  recentEvents: AnalyticsEvent[]
  popularModes: { mode: string; count: number }[]
  dailyStats: { date: string; analyses: number; views: number }[]
  lastUpdated: string
}

const DATA_DIR = path.join(process.cwd(), 'data')
const EVENTS_FILE = path.join(DATA_DIR, 'analytics-events.json')
const STATS_FILE = path.join(DATA_DIR, 'analytics-stats.json')

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true })
  } catch (error) {
    console.error('Error creating data directory:', error)
  }
}

// Read events from file
async function readEvents(): Promise<AnalyticsEvent[]> {
  try {
    await ensureDataDir()
    const data = await fs.readFile(EVENTS_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    // File doesn't exist yet, return empty array
    return []
  }
}

// Write events to file
async function writeEvents(events: AnalyticsEvent[]): Promise<void> {
  await ensureDataDir()
  // Keep only last 10000 events to prevent file from growing too large
  const trimmedEvents = events.slice(-10000)
  await fs.writeFile(EVENTS_FILE, JSON.stringify(trimmedEvents, null, 2))
}

// Add a new event
export async function addEvent(event: Omit<AnalyticsEvent, 'id' | 'timestamp'>): Promise<void> {
  const events = await readEvents()
  const newEvent: AnalyticsEvent = {
    ...event,
    id: Math.random().toString(36).substring(7),
    timestamp: new Date().toISOString()
  }
  events.push(newEvent)
  await writeEvents(events)
  
  // Update stats cache
  await updateStats()
}

// Calculate and cache statistics
async function updateStats(): Promise<void> {
  const events = await readEvents()
  
  const now = new Date()
  const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
  
  // Filter events from last 30 days for most stats
  const recentEvents = events.filter(e => new Date(e.timestamp) > last30Days)
  
  // Calculate statistics
  const pageViews = recentEvents.filter(e => e.event === 'page_view').length
  const analyses = recentEvents.filter(e => e.event === 'text_analyzed')
  const textsAnalyzed = analyses.length
  
  // Score statistics
  const scores = analyses
    .map(e => e.properties?.score)
    .filter((s): s is number => typeof s === 'number')
  
  const averageScore = scores.length > 0 
    ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
    : 0
  
  // Score distribution
  const bucketCounts: Record<string, number> = {}
  analyses.forEach(e => {
    const bucket = e.properties?.bucket
    if (bucket) {
      bucketCounts[bucket] = (bucketCounts[bucket] || 0) + 1
    }
  })
  
  const scoreDistribution = Object.entries(bucketCounts)
    .map(([bucket, count]) => ({ bucket, count }))
    .sort((a, b) => b.count - a.count)
  
  // Mode popularity
  const modeCounts: Record<string, number> = {}
  analyses.forEach(e => {
    const mode = e.properties?.mode
    if (mode) {
      modeCounts[mode] = (modeCounts[mode] || 0) + 1
    }
  })
  
  const popularModes = Object.entries(modeCounts)
    .map(([mode, count]) => ({ mode, count }))
    .sort((a, b) => b.count - a.count)
  
  const totalAnalyses = popularModes
  
  // Downloads and errors
  const downloadCount = recentEvents.filter(e => e.event === 'share_action').length
  const errorCount = recentEvents.filter(e => e.event === 'analysis_error').length
  const errorRate = textsAnalyzed > 0 ? (errorCount / (textsAnalyzed + errorCount)) * 100 : 0
  
  // Daily statistics for last 7 days
  const dailyStats = []
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    date.setHours(0, 0, 0, 0)
    const nextDate = new Date(date)
    nextDate.setDate(nextDate.getDate() + 1)
    
    const dayEvents = events.filter(e => {
      const eventDate = new Date(e.timestamp)
      return eventDate >= date && eventDate < nextDate
    })
    
    dailyStats.push({
      date: date.toISOString().split('T')[0],
      analyses: dayEvents.filter(e => e.event === 'text_analyzed').length,
      views: dayEvents.filter(e => e.event === 'page_view').length
    })
  }
  
  // Get last 20 events for the activity feed
  const last20Events = events
    .slice(-20)
    .reverse()
  
  const stats: AnalyticsStats = {
    pageViews,
    textsAnalyzed,
    totalAnalyses,
    averageScore,
    scoreDistribution,
    downloadCount,
    errorCount,
    errorRate: Math.round(errorRate * 10) / 10,
    recentEvents: last20Events,
    popularModes,
    dailyStats,
    lastUpdated: new Date().toISOString()
  }
  
  await ensureDataDir()
  await fs.writeFile(STATS_FILE, JSON.stringify(stats, null, 2))
}

// Get cached statistics
export async function getStats(): Promise<AnalyticsStats> {
  try {
    await ensureDataDir()
    const data = await fs.readFile(STATS_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    // No stats yet, return empty stats
    return {
      pageViews: 0,
      textsAnalyzed: 0,
      totalAnalyses: [],
      averageScore: 0,
      scoreDistribution: [],
      downloadCount: 0,
      errorCount: 0,
      errorRate: 0,
      recentEvents: [],
      popularModes: [],
      dailyStats: [],
      lastUpdated: new Date().toISOString()
    }
  }
}

// Get recent events
export async function getRecentEvents(limit: number = 20): Promise<AnalyticsEvent[]> {
  const events = await readEvents()
  return events.slice(-limit).reverse()
}