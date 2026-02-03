// types/index.ts

export interface MenuItem {
  id: string
  label: string
  icon: string
  route?: string
  active?: boolean
  expandable?: boolean
  children?: MenuItem[]
}

export interface BreadcrumbItem {
  label: string
  route?: string
  icon?: string
}

export interface User {
  id: string
  name: string
  username: string
  email: string
  status: 'verified' | 'pending' | 'suspended'
}

export type IconType = 'home' | 'palette' | 'file' | 'grid' | 'rocket'