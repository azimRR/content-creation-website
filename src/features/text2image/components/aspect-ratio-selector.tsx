import { cn } from '@/lib/utils'
import { type AspectRatio, ASPECT_RATIOS } from '../types'

interface AspectRatioSelectorProps {
  value: AspectRatio
  onChange: (value: AspectRatio) => void
}

export function AspectRatioSelector({ value, onChange }: AspectRatioSelectorProps) {
  return (
    <div className='space-y-2'>
      <label className='text-sm font-medium leading-none'>
        Aspect Ratio
      </label>
      <div className='flex flex-wrap gap-2'>
        {ASPECT_RATIOS.map((ratio) => {
          const isSelected = value === ratio.value
          // Normalize to max 32px height for preview
          const maxDim = 28
          const scale = maxDim / Math.max(ratio.width, ratio.height)
          const w = Math.round(ratio.width * scale)
          const h = Math.round(ratio.height * scale)

          return (
            <button
              key={ratio.value}
              type='button'
              onClick={() => onChange(ratio.value)}
              className={cn(
                'flex flex-col items-center gap-1.5 rounded-lg border px-3 py-2 transition-colors',
                isSelected
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border hover:border-primary/50 text-muted-foreground hover:text-foreground'
              )}
            >
              <div
                className={cn(
                  'rounded-sm border',
                  isSelected ? 'border-primary bg-primary/20' : 'border-muted-foreground/30 bg-muted'
                )}
                style={{ width: `${w}px`, height: `${h}px` }}
              />
              <span className='text-xs font-medium'>{ratio.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
