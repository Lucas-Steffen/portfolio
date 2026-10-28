import { en } from './en'
import { pt } from './pt'
import type { Content, Lang } from './types'

export const content: Record<Lang, Content> = { pt, en }
export { links } from './shared'
export type { Content, Lang, SkillGroupId } from './types'
