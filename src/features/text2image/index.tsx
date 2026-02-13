import { useState } from 'react'
import { toast } from 'sonner'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { handleServerError } from '@/lib/handle-server-error'
import { text2imageApi } from './api'
import { PromptForm } from './components/prompt-form'
import { ImageDisplay } from './components/image-display'
import type { AspectRatio, Text2ImageResponse } from './types'

export default function Text2Image() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<Text2ImageResponse | null>(null)

  const handleGenerate = async (prompt: string, aspectRatio: AspectRatio) => {
    setIsLoading(true)
    try {
      const response = await text2imageApi.generate({
        prompt,
        aspect_ratio: aspectRatio,
      })
      setResult(response)
      toast.success('Image generated successfully!')
    } catch (error) {
      handleServerError(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Header fixed>
        <h1 className='text-lg font-semibold'>Text to Image</h1>
      </Header>
      <Main>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
          <div>
            <PromptForm onSubmit={handleGenerate} isLoading={isLoading} />
          </div>
          <div>
            <ImageDisplay result={result} isLoading={isLoading} />
          </div>
        </div>
      </Main>
    </>
  )
}
