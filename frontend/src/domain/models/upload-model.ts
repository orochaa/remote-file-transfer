import type { File } from './file-model.js'

export interface Upload {
  id: string
  title: string
  message: string
  name: string
  mimetype: string
  path: string
  size: number
  expiresAt: Date
  createdAt: Date
  updatedAt: Date

  files: File[]
}
