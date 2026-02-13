import { AxiosError } from 'axios'
import { toast } from 'sonner'

export function handleServerError(error: unknown) {
  console.error(error)

  let errMsg = 'Something went wrong!'

  if (
    error &&
    typeof error === 'object' &&
    'status' in error &&
    Number(error.status) === 204
  ) {
    errMsg = 'Content not found.'
  }

  if (error instanceof AxiosError) {
    const response = error.response
    if (response?.data) {
      const detail = response.data.detail
      if (typeof detail === 'string') {
        errMsg = detail
      } else if (Array.isArray(detail)) {
        errMsg = detail.map((d: { msg?: string }) => d.msg).filter(Boolean).join(', ') || `HTTP ${response.status}: ${response.statusText}`
      } else {
        errMsg = response.data.message ||
                 response.data.error ||
                 `HTTP ${response.status}: ${response.statusText}`
      }
    } else if (error.code === 'ECONNABORTED') {
      errMsg = 'Request timeout. Image generation may take up to 60 seconds.'
    } else if (error.code === 'ERR_NETWORK') {
      errMsg = 'Network error. Please check your connection.'
    }
  }

  toast.error(errMsg)
}
