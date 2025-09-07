'use client'

interface EvidenceListProps {
  evidence: string[]
}

export default function EvidenceList({ evidence }: EvidenceListProps) {
  if (!evidence || evidence.length === 0) return null

  return (
    <div className="w-full max-w-2xl">
      <h3 className="text-xl font-serif font-bold text-blood-400 mb-4">Evidence of Vampirism</h3>
      <div className="space-y-3">
        {evidence.map((item, index) => (
          <div
            key={index}
            className="flex gap-3 p-4 bg-charcoal-900/50 border border-charcoal-800 rounded-lg"
          >
            <span className="text-blood-500 flex-shrink-0">🩸</span>
            <p className="text-gray-300 text-sm italic">&ldquo;{item}&rdquo;</p>
          </div>
        ))}
      </div>
    </div>
  )
}