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
      errMsg = response.data.detail ||
               response.data.message ||
               response.data.error ||
               `HTTP ${response.status}: ${response.statusText}`
    } else if (error.code === 'ECONNABORTED') {
      errMsg = 'Request timeout. Image generation may take up to 60 seconds.'
    } else if (error.code === 'ERR_NETWORK') {
      errMsg = 'Network error. Please check your connection.'
    }
  }

  toast.error(errMsg)
}
