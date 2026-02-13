import { useLayout } from '@/context/layout-provider'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import { sidebarData } from './data/sidebar-data'
import { NavGroup } from './nav-group'
import { ProfileDropdown } from '@/components/profile-dropdown'

export function AppSidebar() {
  const { collapsible, variant } = useLayout()

  return (
    <Sidebar collapsible={collapsible} variant={variant}>
      <SidebarHeader className='p-4'>
        <div className='flex items-center gap-2'>
          <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground'>
            <span className='text-sm font-bold'>F</span>
          </div>
          <span className='text-lg font-semibold'>Fotiha Studio</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.navGroups.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <ProfileDropdown />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
