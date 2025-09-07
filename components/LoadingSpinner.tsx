'use client'

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-charcoal-700 rounded-full"></div>
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blood-600 rounded-full animate-spin border-t-transparent"></div>
      </div>
      <p className="text-gray-400 font-serif animate-pulse">Analyzing vampiric essence...</p>
    </div>
  )
}