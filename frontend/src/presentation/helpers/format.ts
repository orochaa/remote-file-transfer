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

export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) {
    return '0 Bytes'
  }

  const k = 1024
  const dm = Math.max(decimals, 0)
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${Number.parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

export function formatDateDifferenceInDays(date: string | Date): number {
  if (typeof date === 'string') {
    date = new Date(date)
  }

  const oneDayInMilliseconds = 24 * 60 * 60 * 1000
  const currentDate = new Date()
  const diffMilliseconds = currentDate.getTime() - date.getTime()

  return Math.round(Math.abs(diffMilliseconds / oneDayInMilliseconds))
}

export function formatDateInput(date: string | Date): string {
  if (typeof date === 'string') {
    date = new Date(date)
  }

  const day = (date.getDate() + 1).toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()

  return `${year}-${month}-${day}`
}
