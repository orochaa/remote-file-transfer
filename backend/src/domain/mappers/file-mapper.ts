import type { File as PrismaFile } from '@prisma/client'
import type { File } from '../entities/file.js'

export class FileMapper {
  constructor(private readonly props: File) {}

  public toPrisma(): PrismaFile {
    return {
      id: this.props.id,
      uploadId: this.props.uploadId,
      name: this.props.name,
      originalName: this.props.originalName,
      path: this.props.path,
      mimetype: this.props.mimetype,
      size: this.props.size,
      createdAt: this.props.createdAt,
    }
  }

  public toHttp() {
    return {
      id: this.props.id,
      name: this.props.originalName,
      size: this.props.size,
      mimetype: this.props.mimetype,
      createdAt: this.props.createdAt,
    }
  }
}
