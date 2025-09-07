export type Mode = 'startup' | 'dating' | 'politics' | 'everyday'

export type VampireBucket = 'Pure Soul' | 'Slight Fang' | 'Opportunistic' | 'Thirsty' | 'Ancient Vampire'

export interface Scores {
  buzzword_density: number
  ego_inflation: number
  resource_extractiveness: number
  manipulative_tactics: number
  vagueness_substance: number
  tone_darkness: number
}

export interface AnalysisResult {
  mode: Mode
  overall_vampire_score: number
  bucket: VampireBucket
  scores: Scores
  evidence: string[]
}

const WEIGHTS = {
  buzzword_density: 20,
  ego_inflation: 15,
  resource_extractiveness: 20,
  manipulative_tactics: 20,
  vagueness_substance: 15,
  tone_darkness: 10,
}

const BUZZWORDS = [
  'synergy', 'disrupt', 'thought leader', 'visionary', '10x', 'web3', 
  'ai-powered', 'unicorn', 'paradigm', 'stakeholder', 'leverage', 
  'growth hack', 'hustle', 'crushing it', 'ninja', 'rockstar', 'guru',
  'game-changer', 'revolutionary', 'blockchain', 'crypto', 'nft',
  'metaverse', 'ecosystem', 'innovate', 'scale', 'pivot', 'agile',
  'bandwidth', 'synergize', 'ideate', 'mindshare', 'bleeding edge',
  'move the needle', 'circle back', 'deep dive', 'low-hanging fruit',
]

const EGO_PHRASES = [
  'world-class', 'elite', 'best in class', 'award-winning', 'top 1%',
  'genius', 'serial entrepreneur', 'industry leader', 'expert',
  'authority', 'influencer', 'thought leader', 'game changer',
  'pioneer', 'mastermind', 'mogul', 'titan', 'legend', 'icon',
  'revolutionary', 'brilliant', 'exceptional', 'extraordinary',
  'unparalleled', 'unprecedented', 'groundbreaking', 'cutting-edge',
]

const EXTRACTIVE_MARKERS = [
  'raise', 'round', 'funding', 'buy now', 'limited time', 'dm me',
  'book a call', 'apply now', 'scale your', 'monetize', 'leads',
  'pipeline', 'i need you to', 'invest', 'opportunity', 'exclusive',
  'vip', 'premium', 'upgrade', 'subscribe', 'join my', 'sign up',
  'register now', 'early bird', 'special offer', 'discount', 'bonus',
  'free trial', 'money back', 'guarantee', 'risk-free', 'act now',
  'spots available', 'closing soon', 'deadline', 'hurry', 'last chance',
]

const MANIPULATION_PHRASES = [
  "don't miss out", 'or else', 'you must', 'only an idiot', 'everyone knows',
  'shame', 'guilt', 'fear', 'urgent', 'immediately', 'now or never',
  'regret', 'mistake', 'failure', 'lose out', 'left behind', 'too late',
  'running out', 'almost gone', 'final', 'ending soon', 'expires',
  'pressure', 'obligation', 'duty', 'responsible', 'blame', 'fault',
  'disappointed', 'let down', 'missing out', 'fomo', 'scarcity',
]

const VAGUENESS_WORDS = [
  'innovative', 'impactful', 'transformative', 'strategic', 'dynamic',
  'robust', 'seamless', 'holistic', 'optimal', 'efficient', 'effective',
  'comprehensive', 'cutting-edge', 'next-gen', 'state-of-the-art',
  'best-in-class', 'world-class', 'leading', 'premier', 'top-tier',
  'revolutionary', 'game-changing', 'disruptive', 'breakthrough',
  'unprecedented', 'unmatched', 'superior', 'exceptional', 'outstanding',
]

const DARK_TONE_WORDS = [
  'exploit', 'manipulate', 'control', 'dominate', 'crush', 'destroy',
  'eliminate', 'annihilate', 'conquer', 'subjugate', 'overpower',
  'ruthless', 'merciless', 'cutthroat', 'aggressive', 'hostile',
  'predatory', 'parasitic', 'toxic', 'venomous', 'malicious',
  'devour', 'consume', 'drain', 'suck', 'leech', 'vampire', 'blood',
]

function tokenize(text: string): string[] {
  return text.toLowerCase().split(/\s+/).filter(word => word.length > 0)
}

function countOccurrences(text: string, phrases: string[]): number {
  const lowerText = text.toLowerCase()
  return phrases.reduce((count, phrase) => {
    const regex = new RegExp(phrase.toLowerCase(), 'gi')
    const matches = lowerText.match(regex)
    return count + (matches ? matches.length : 0)
  }, 0)
}

function extractEvidence(text: string, phrases: string[], maxEvidence: number = 3): string[] {
  const evidence: string[] = []
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0)
  
  for (const sentence of sentences) {
    if (evidence.length >= maxEvidence) break
    
    const lowerSentence = sentence.toLowerCase()
    for (const phrase of phrases) {
      if (lowerSentence.includes(phrase.toLowerCase())) {
        const trimmed = sentence.trim()
        if (trimmed.length > 20 && trimmed.length < 200) {
          evidence.push(trimmed.substring(0, 150) + (trimmed.length > 150 ? '...' : ''))
          break
        }
      }
    }
  }
  
  return evidence
}

function calculateBuzzwordDensity(text: string): { score: number; evidence: string[] } {
  const words = tokenize(text)
  const wordCount = words.length || 1
  const buzzwordCount = countOccurrences(text, BUZZWORDS)
  const density = (buzzwordCount / wordCount) * 100
  
  const score = Math.min(100, density * 10)
  const evidence = extractEvidence(text, BUZZWORDS, 2)
  
  return { score, evidence }
}

function calculateEgoInflation(text: string): { score: number; evidence: string[] } {
  const egoCount = countOccurrences(text, EGO_PHRASES)
  const words = tokenize(text)
  const wordCount = words.length || 1
  const density = (egoCount / wordCount) * 100
  
  const score = Math.min(100, density * 15)
  const evidence = extractEvidence(text, EGO_PHRASES, 2)
  
  return { score, evidence }
}

function calculateResourceExtractiveness(text: string): { score: number; evidence: string[] } {
  const extractCount = countOccurrences(text, EXTRACTIVE_MARKERS)
  const words = tokenize(text)
  const wordCount = words.length || 1
  const density = (extractCount / wordCount) * 100
  
  const score = Math.min(100, density * 12)
  const evidence = extractEvidence(text, EXTRACTIVE_MARKERS, 2)
  
  return { score, evidence }
}

function calculateManipulativeTactics(text: string): { score: number; evidence: string[] } {
  const manipCount = countOccurrences(text, MANIPULATION_PHRASES)
  const words = tokenize(text)
  const wordCount = words.length || 1
  const density = (manipCount / wordCount) * 100
  
  const score = Math.min(100, density * 15)
  const evidence = extractEvidence(text, MANIPULATION_PHRASES, 2)
  
  return { score, evidence }
}

function calculateVaguenessSubstance(text: string): { score: number; evidence: string[] } {
  const vagueCount = countOccurrences(text, VAGUENESS_WORDS)
  const words = tokenize(text)
  const wordCount = words.length || 1
  
  const numbers = text.match(/\d+/g)?.length || 0
  const properNouns = text.match(/[A-Z][a-z]+/g)?.length || 0
  const specificityScore = (numbers + properNouns) / wordCount
  
  const vagueDensity = (vagueCount / wordCount) * 100
  const adjustedScore = vagueDensity * 10 - (specificityScore * 20)
  
  const score = Math.min(100, Math.max(0, adjustedScore))
  const evidence = extractEvidence(text, VAGUENESS_WORDS, 2)
  
  return { score, evidence }
}

function calculateToneDarkness(text: string): { score: number; evidence: string[] } {
  const darkCount = countOccurrences(text, DARK_TONE_WORDS)
  const words = tokenize(text)
  const wordCount = words.length || 1
  
  const exclamations = (text.match(/!/g) || []).length
  const allCaps = (text.match(/\b[A-Z]{2,}\b/g) || []).length
  
  const darkDensity = (darkCount / wordCount) * 100
  const intensityBoost = (exclamations + allCaps) * 2
  
  const score = Math.min(100, darkDensity * 8 + intensityBoost)
  const evidence = extractEvidence(text, DARK_TONE_WORDS, 2)
  
  return { score, evidence }
}

function getBucket(score: number): VampireBucket {
  if (score <= 20) return 'Pure Soul'
  if (score <= 40) return 'Slight Fang'
  if (score <= 60) return 'Opportunistic'
  if (score <= 80) return 'Thirsty'
  return 'Ancient Vampire'
}

export function analyzeText(text: string, mode: Mode = 'everyday'): AnalysisResult {
  const buzzword = calculateBuzzwordDensity(text)
  const ego = calculateEgoInflation(text)
  const extractive = calculateResourceExtractiveness(text)
  const manipulative = calculateManipulativeTactics(text)
  const vagueness = calculateVaguenessSubstance(text)
  const darkness = calculateToneDarkness(text)
  
  const modeMultipliers: Record<Mode, Partial<Scores>> = {
    startup: { buzzword_density: 1.2, resource_extractiveness: 1.3 },
    dating: { ego_inflation: 1.3, manipulative_tactics: 1.2 },
    politics: { vagueness_substance: 1.4, manipulative_tactics: 1.3 },
    everyday: {},
  }
  
  const multipliers = modeMultipliers[mode]
  
  const scores: Scores = {
    buzzword_density: Math.min(100, buzzword.score * (multipliers.buzzword_density || 1)),
    ego_inflation: Math.min(100, ego.score * (multipliers.ego_inflation || 1)),
    resource_extractiveness: Math.min(100, extractive.score * (multipliers.resource_extractiveness || 1)),
    manipulative_tactics: Math.min(100, manipulative.score * (multipliers.manipulative_tactics || 1)),
    vagueness_substance: Math.min(100, vagueness.score * (multipliers.vagueness_substance || 1)),
    tone_darkness: Math.min(100, darkness.score * (multipliers.tone_darkness || 1)),
  }
  
  const overall_vampire_score = Math.round(
    (scores.buzzword_density * WEIGHTS.buzzword_density +
     scores.ego_inflation * WEIGHTS.ego_inflation +
     scores.resource_extractiveness * WEIGHTS.resource_extractiveness +
     scores.manipulative_tactics * WEIGHTS.manipulative_tactics +
     scores.vagueness_substance * WEIGHTS.vagueness_substance +
     scores.tone_darkness * WEIGHTS.tone_darkness) / 100
  )
  
  const allEvidence = [
    ...buzzword.evidence,
    ...ego.evidence,
    ...extractive.evidence,
    ...manipulative.evidence,
    ...vagueness.evidence,
    ...darkness.evidence,
  ]
  
  const uniqueEvidence = Array.from(new Set(allEvidence)).slice(0, 6)
  
  return {
    mode,
    overall_vampire_score: Math.min(100, Math.max(0, overall_vampire_score)),
    bucket: getBucket(overall_vampire_score),
    scores,
    evidence: uniqueEvidence,
  }
}