import { File } from './file.js'
import { UUID } from './uuid.js'

export class Upload {
  private readonly props: Upload.Props

  constructor(params: Upload.Params) {
    this.props = {
      ...params,
      id: new UUID(params.id),
      createdAt: params.createdAt ?? new Date(),
      updatedAt: params.updatedAt ?? new Date(),

      files: params.files.map(file => new File(file)),
    }
  }

  get id(): string {
    return this.props.id.value
  }

  get title(): string {
    return this.props.title
  }

  get message(): string {
    return this.props.message
  }

  get size(): number {
    return this.props.size
  }

  get expiresAt(): Date {
    return this.props.expiresAt
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date {
    return this.props.updatedAt
  }

  get files(): File[] {
    return this.props.files
  }
}

export namespace Upload {
  export interface Props {
    id: UUID
    title: string
    message: string
    size: number
    expiresAt: Date
    createdAt: Date
    updatedAt: Date

    files: File[]
  }

  export interface Params {
    id?: string
    title: string
    message: string
    size: number
    expiresAt: Date
    createdAt?: Date
    updatedAt?: Date

    files: File.Params[]
  }
}
