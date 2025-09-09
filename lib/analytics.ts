'use client'

export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  try {
    // Track with our in-house analytics
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ event: eventName, properties }),
    }).catch(err => console.error('Analytics error:', err))
  } catch (error) {
    console.error('Analytics tracking error:', error)
  }
}

export const analyticsEvents = {
  // Page views
  pageView: (page: string) => trackEvent('page_view', { page }),
  
  // User interactions
  textAnalyzed: (mode: string, textLength: number, score: number, bucket: string) => 
    trackEvent('text_analyzed', { mode, textLength, score, bucket }),
  
  modeChanged: (from: string, to: string) => 
    trackEvent('mode_changed', { from, to }),
  
  shareAction: (action: 'download_card') => 
    trackEvent('share_action', { action }),
  
  resetAnalysis: () => 
    trackEvent('reset_analysis'),
  
  // Error tracking
  analysisError: (error: string) => 
    trackEvent('analysis_error', { error }),
  
  // Engagement metrics
  textInput: (length: number) => 
    trackEvent('text_input', { length }),
  
  resultViewed: (score: number, bucket: string) => 
    trackEvent('result_viewed', { score, bucket }),
}