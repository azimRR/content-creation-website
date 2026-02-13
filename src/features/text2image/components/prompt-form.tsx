import { useState } from 'react'
import { Loader2, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { AspectRatioSelector } from './aspect-ratio-selector'
import { type AspectRatio } from '../types'

interface PromptFormProps {
  onSubmit: (prompt: string, aspectRatio: AspectRatio) => void
  isLoading: boolean
}

export function PromptForm({ onSubmit, isLoading }: PromptFormProps) {
  const [prompt, setPrompt] = useState('')
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim() || isLoading) return
    onSubmit(prompt.trim(), aspectRatio)
  }

  const charCount = prompt.length
  const isValid = charCount >= 1 && charCount <= 5000

  return (
    <form onSubmit={handleSubmit} className='space-y-5'>
      <div className='space-y-2'>
        <label htmlFor='prompt' className='text-sm font-medium leading-none'>
          Prompt
        </label>
        <Textarea
          id='prompt'
          placeholder='Describe the image you want to create...'
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={isLoading}
          rows={5}
          className='resize-none'
          maxLength={5000}
        />
        <div className='flex justify-between text-xs text-muted-foreground'>
          <span>
            {charCount > 0 && !isValid && (
              <span className='text-destructive'>Prompt must be 1-5000 characters</span>
            )}
          </span>
          <span>{charCount} / 5000</span>
        </div>
      </div>

      <AspectRatioSelector value={aspectRatio} onChange={setAspectRatio} />

      <Button
        type='submit'
        className='w-full'
        disabled={!isValid || isLoading}
        size='lg'
      >
        {isLoading ? (
          <>
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className='mr-2 h-4 w-4' />
            Generate Image
          </>
        )}
      </Button>
    </form>
  )
}
