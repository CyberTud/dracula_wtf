import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ScoreGauge from '@/components/ScoreGauge'
import SubscoreBars from '@/components/SubscoreBars'
import RoastBlock from '@/components/RoastBlock'
import ShareActions from '@/components/ShareActions'
import EvidenceList from '@/components/EvidenceList'
import { resultsCache } from '@/lib/cache'

interface PageProps {
  params: {
    id: string
  }
  searchParams: {
    score?: string
    bucket?: string
    mode?: string
    roast?: string
  }
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const score = searchParams.score || '0'
  const bucket = searchParams.bucket || 'Unknown'
  const roast = searchParams.roast || 'Vampire analysis result'
  
  const baseUrl = process.env.BASE_URL || 'https://dracula.wtf'
  const ogImageUrl = `${baseUrl}/og?score=${score}&bucket=${encodeURIComponent(bucket)}&roast=${encodeURIComponent(roast.substring(0, 140))}`

  return {
    title: `Vampire Score: ${score} - ${bucket} | Dracula.wtf`,
    description: roast.substring(0, 160),
    openGraph: {
      title: `I scored ${score} on the Vampire Scale!`,
      description: roast.substring(0, 160),
      url: `${baseUrl}/r/${params.id}`,
      siteName: 'Dracula.wtf',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `Vampire Score: ${score} - ${bucket}`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Vampire Score: ${score} - ${bucket}`,
      description: roast.substring(0, 160),
      images: [ogImageUrl],
    },
  }
}

export default function ResultPage({ params, searchParams }: PageProps) {
  // Try to get from cache first
  const cached = resultsCache.get(params.id)
  
  // If not in cache, try to reconstruct from URL params
  if (!cached && (!searchParams.score || !searchParams.bucket)) {
    notFound()
  }

  const result = cached || {
    mode: searchParams.mode || 'everyday',
    overall_vampire_score: parseInt(searchParams.score || '0'),
    bucket: searchParams.bucket || 'Unknown',
    scores: {
      buzzword_density: 0,
      ego_inflation: 0,
      resource_extractiveness: 0,
      manipulative_tactics: 0,
      vagueness_substance: 0,
      tone_darkness: 0,
    },
    evidence: [],
    roast: searchParams.roast || 'No roast available',
  }

  const baseUrl = process.env.BASE_URL || 'http://localhost:3000'
  const shareData = {
    resultId: params.id,
    cardPngUrl: `${baseUrl}/api/card.png?score=${result.overall_vampire_score}&bucket=${result.bucket}&mode=${result.mode}&roast=${encodeURIComponent(result.roast)}`,
    ogUrl: `${baseUrl}/og?score=${result.overall_vampire_score}&bucket=${result.bucket}&mode=${result.mode}&roast=${encodeURIComponent(result.roast)}`,
    permalink: `${baseUrl}/r/${params.id}`,
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-blood-400 mb-4 text-shadow-blood">
          Vampire Analysis Result
        </h1>
        <p className="text-lg text-gray-300">
          {result.mode.charAt(0).toUpperCase() + result.mode.slice(1)} Mode Analysis
        </p>
      </div>

      <div className="space-y-12">
        {/* Score Gauge */}
        <div className="flex justify-center">
          <ScoreGauge score={result.overall_vampire_score} bucket={result.bucket} />
        </div>

        {/* Roast */}
        <RoastBlock roast={result.roast} />

        {/* Subscores */}
        {cached && (
          <div className="flex justify-center">
            <SubscoreBars scores={result.scores as any} />
          </div>
        )}

        {/* Evidence */}
        {cached && result.evidence.length > 0 && (
          <div className="flex justify-center">
            <EvidenceList evidence={result.evidence} />
          </div>
        )}

        {/* Share Actions */}
        <div className="py-8 border-t border-charcoal-800">
          <h3 className="text-xl font-serif font-bold text-center text-blood-400 mb-6">
            Share Your Vampire Score
          </h3>
          <ShareActions
            shareUrl={shareData.permalink}
            cardPngUrl={shareData.cardPngUrl}
            score={result.overall_vampire_score}
            roast={result.roast}
          />
        </div>

        {/* New Analysis Button */}
        <div className="flex justify-center pt-8">
          <a
            href="/"
            className="px-6 py-3 rounded-lg font-medium transition-all duration-200 bg-blood-600 text-white hover:bg-blood-700 hover:shadow-xl hover:shadow-blood-600/30"
          >
            🩸 Analyze New Text
          </a>
        </div>
      </div>
    </div>
  )
}