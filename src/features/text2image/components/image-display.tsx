import { Download, ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import type { Text2ImageResponse } from '../types'

interface ImageDisplayProps {
  result: Text2ImageResponse | null
  isLoading: boolean
}

export function ImageDisplay({ result, isLoading }: ImageDisplayProps) {
  const handleDownload = async () => {
    if (!result?.url) return
    try {
      const response = await fetch(result.url)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `fotiha-${result.id}.png`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      a.remove()
    } catch {
      // Fallback: open in new tab
      window.open(result.url, '_blank')
    }
  }

  if (isLoading) {
    return (
      <div className='space-y-4'>
        <Skeleton className='aspect-square w-full rounded-xl' />
        <div className='space-y-2'>
          <Skeleton className='h-4 w-3/4' />
          <Skeleton className='h-4 w-1/2' />
        </div>
      </div>
    )
  }

  if (!result) {
    return (
      <div className='flex flex-col items-center justify-center rounded-xl border border-dashed border-muted-foreground/25 bg-muted/30 p-12 text-center'>
        <ImageIcon className='h-12 w-12 text-muted-foreground/40 mb-4' />
        <p className='text-sm font-medium text-muted-foreground'>
          Your generated image will appear here
        </p>
        <p className='text-xs text-muted-foreground/60 mt-1'>
          Enter a prompt and click Generate
        </p>
      </div>
    )
  }

  return (
    <div className='space-y-4'>
      <div className='overflow-hidden rounded-xl border'>
        <img
          src={result.url}
          alt={result.prompt}
          className='w-full object-contain'
        />
      </div>
      <div className='flex items-start justify-between gap-4'>
        <div className='min-w-0 flex-1'>
          <p className='text-sm text-muted-foreground line-clamp-2'>
            {result.prompt}
          </p>
          <p className='text-xs text-muted-foreground/60 mt-1'>
            {result.aspect_ratio} &middot; {new Date(result.created_at).toLocaleString()}
          </p>
        </div>
        <Button variant='outline' size='sm' onClick={handleDownload}>
          <Download className='h-4 w-4 mr-1' />
          Download
        </Button>
      </div>
    </div>
  )
}
