export interface Member {
  name: string
  role?: string
  link?: string
  avatar?: string
  anonymous?: boolean
  teammembers?: {
    name?: string
    role?: string
    link?: string
    [k: string]: unknown
  }[]
  company?: {
    name?: string
    link?: string
    contacts?: string
    [k: string]: unknown
  }
}
