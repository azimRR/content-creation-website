export type AspectRatio = '1:1' | '16:9' | '9:16' | '4:3' | '3:4'

export interface Text2ImageRequest {
  prompt: string
  aspect_ratio?: AspectRatio
}

export interface Text2ImageResponse {
  id: number
  url: string
  prompt: string
  aspect_ratio: AspectRatio
  created_at: string
}

export const ASPECT_RATIOS: {
  value: AspectRatio
  label: string
  width: number
  height: number
}[] = [
  { value: '1:1', label: 'Square', width: 1, height: 1 },
  { value: '16:9', label: 'Landscape', width: 16, height: 9 },
  { value: '9:16', label: 'Portrait', width: 9, height: 16 },
  { value: '4:3', label: 'Standard', width: 4, height: 3 },
  { value: '3:4', label: 'Std Portrait', width: 3, height: 4 },
]
