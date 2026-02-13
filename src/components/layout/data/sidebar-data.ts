import { ImagePlus, Images, Settings } from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  navGroups: [
    {
      title: 'Create',
      items: [
        {
          title: 'Text to Image',
          url: '/text2image',
          icon: ImagePlus,
        },
      ],
    },
    {
      title: 'Library',
      items: [
        {
          title: 'Gallery',
          url: '/gallery',
          icon: Images,
          badge: 'Soon',
        },
      ],
    },
    {
      title: 'Account',
      items: [
        {
          title: 'Settings',
          url: '/settings',
          icon: Settings,
          badge: 'Soon',
        },
      ],
    },
  ],
}
