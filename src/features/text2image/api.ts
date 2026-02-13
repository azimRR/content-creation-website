import api from '@/lib/api'
import type { Text2ImageRequest, Text2ImageResponse } from './types'

export const text2imageApi = {
  generate: async (data: Text2ImageRequest): Promise<Text2ImageResponse> => {
    const response = await api.post<Text2ImageResponse>('/image/text2image', data)
    return response.data
  },
}
