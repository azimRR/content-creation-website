import { createFileRoute } from '@tanstack/react-router'
import Text2Image from '@/features/text2image'

export const Route = createFileRoute('/_authenticated/text2image')({
  component: Text2Image,
})
