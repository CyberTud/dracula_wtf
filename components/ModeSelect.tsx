'use client'

import { Mode } from '@/lib/rubric'
import clsx from 'clsx'

interface ModeSelectProps {
  value: Mode
  onChange: (mode: Mode) => void
}

const modes: { value: Mode; label: string; icon: string }[] = [
  { value: 'everyday', label: 'Everyday', icon: '💬' },
  { value: 'startup', label: 'Startup', icon: '🚀' },
  { value: 'dating', label: 'Dating', icon: '💕' },
  { value: 'politics', label: 'Politics', icon: '🏛️' },
]

export default function ModeSelect({ value, onChange }: ModeSelectProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center" role="radiogroup" aria-label="Select analysis mode">
      {modes.map((mode) => (
        <button
          key={mode.value}
          onClick={() => onChange(mode.value)}
          role="radio"
          aria-checked={value === mode.value}
          className={clsx(
            'px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2',
            'border-2 font-medium',
            value === mode.value
              ? 'bg-blood-600 border-blood-600 text-white shadow-lg shadow-blood-600/30'
              : 'bg-charcoal-900 border-charcoal-700 text-gray-300 hover:border-blood-600/50 hover:text-white'
          )}
        >
          <span className="text-lg" role="img" aria-label={mode.label}>
            {mode.icon}
          </span>
          <span>{mode.label}</span>
        </button>
      ))}
    </div>
  )
}