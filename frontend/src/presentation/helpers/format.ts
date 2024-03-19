import { clsx } from 'clsx'
import type { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...className: ClassValue[]): string {
  return twMerge(clsx(...className))
}

export const formatPlaceholder = (label: string): string => {
  return [
    'Digite',
    /as?$/i.test(label) ? 'sua' : 'seu',
    label.toLowerCase(),
  ].join(' ')
}
