import { describe, it, expect } from 'vitest'
import { analyzeText } from '@/lib/rubric'

describe('Rubric Scoring', () => {
  it('should return low score for innocent text', () => {
    const result = analyzeText('I love spending time with my family and friends. The weather is nice today.')
    expect(result.overall_vampire_score).toBeLessThan(30)
    expect(result.bucket).toBe('Pure Soul')
  })

  it('should return high score for buzzword-heavy text', () => {
    const text = 'As a visionary thought leader and serial entrepreneur, I leverage synergy to disrupt paradigms. My revolutionary blockchain AI-powered web3 solution will 10x your growth hack potential. This game-changing unicorn opportunity is a paradigm shift.'
    const result = analyzeText(text, 'startup')
    expect(result.overall_vampire_score).toBeGreaterThan(50)
  })

  it('should detect manipulative tactics', () => {
    const text = "Don't miss out on this urgent opportunity! You must act now or you'll regret it forever. Only an idiot would pass this up. Time is running out!"
    const result = analyzeText(text)
    expect(result.scores.manipulative_tactics).toBeGreaterThan(40)
  })

  it('should detect resource extraction', () => {
    const text = 'DM me now! Book a call immediately! Buy my course! Apply for my exclusive program! Limited spots available! Invest in my startup! Sign up for premium access!'
    const result = analyzeText(text)
    expect(result.scores.resource_extractiveness).toBeGreaterThan(40)
  })

  it('should apply mode multipliers correctly', () => {
    const text = 'innovative strategic synergy leverage paradigm'
    const everydayResult = analyzeText(text, 'everyday')
    const startupResult = analyzeText(text, 'startup')
    
    expect(startupResult.scores.buzzword_density).toBeGreaterThan(everydayResult.scores.buzzword_density)
  })

  it('should extract evidence snippets', () => {
    const text = 'As a thought leader, I need you to book a call immediately. This revolutionary opportunity will transform your life.'
    const result = analyzeText(text)
    
    expect(result.evidence.length).toBeGreaterThan(0)
    expect(result.evidence.some(e => e.includes('thought leader') || e.includes('book a call'))).toBe(true)
  })

  it('should map scores to correct buckets', () => {
    expect(analyzeText('nice day', 'everyday').bucket).toBe('Pure Soul')
    
    const manipulativeText = Array(50).fill("Don't miss out! Act now! Limited time!").join(' ')
    const result = analyzeText(manipulativeText)
    expect(['Thirsty', 'Ancient Vampire']).toContain(result.bucket)
  })

  it('should cap scores at 100', () => {
    const extremeText = Array(100).fill('synergy disrupt revolutionary unicorn blockchain').join(' ')
    const result = analyzeText(extremeText)
    
    expect(result.overall_vampire_score).toBeLessThanOrEqual(100)
    Object.values(result.scores).forEach(score => {
      expect(score).toBeLessThanOrEqual(100)
    })
  })
})