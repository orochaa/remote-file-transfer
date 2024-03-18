import { UUID } from './uuid.js'

export class File {
  private readonly props: File.Props

  constructor(params: File.Params) {
    this.props = {
      ...params,
      id: new UUID(params.id),
      uploadId: params.uploadId ? UUID.parse(params.uploadId) : '',
      createdAt: params.createdAt ?? new Date(),
    }
  }

  get id(): string {
    return this.props.id.value
  }

  get uploadId(): string {
    return this.props.uploadId
  }

  get name(): string {
    return this.props.name
  }

  get path(): string {
    return this.props.path
  }

  get mimetype(): string {
    return this.props.mimetype
  }

  get size(): number {
    return this.props.size
  }

  get createdAt(): Date {
    return this.props.createdAt
  }
}

export namespace File {
  export interface Props {
    id: UUID
    uploadId: string
    name: string
    path: string
    mimetype: string
    size: number
    createdAt: Date
  }

  export interface Params {
    id?: string
    uploadId?: string
    name: string
    path: string
    mimetype: string
    size: number
    createdAt?: Date
  }
}
