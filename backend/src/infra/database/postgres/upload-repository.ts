import { Upload } from '#domain/entities/upload.js'
import { FileMapper } from '#domain/mappers/file-mapper.js'
import { UploadMapper } from '#domain/mappers/upload-mapper.js'
import { Injectable } from '@nestjs/common'
import { PrismaService } from './prisma.service.js'

@Injectable()
export class UploadRepository {
  constructor(private readonly db: PrismaService) {}

  async create(data: Upload): Promise<void> {
    await this.db.upload.create({
      data: {
        ...new UploadMapper(data).toPrisma(),
        files: {
          create: data.files.map(file => ({
            ...new FileMapper(file).toPrisma(),
            uploadId: undefined,
          })),
        },
      },
    })
  }

  async findById(id: string): Promise<Upload | null> {
    const data = await this.db.upload.findUnique({
      where: {
        id,
        expiresAt: {
          gte: new Date(),
        },
      },
      include: {
        files: true,
      },
    })

    if (!data) {
      return null
    }

    return new Upload(data)
  }

  async listExpired(): Promise<Upload[]> {
    const expiredUploads = await this.db.upload.findMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
      include: {
        files: true,
      },
    })

    return expiredUploads.map(upload => new Upload(upload))
  }
}
