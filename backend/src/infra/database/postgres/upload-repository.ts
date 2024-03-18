import { File } from '#domain/entities/file.js'
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
          create: data.files.map(file => new FileMapper(file).toPrisma()),
        },
      },
    })
  }

  async findById(id: string): Promise<Upload | null> {
    const data = await this.db.upload.findUnique({
      where: {
        id,
      },
      include: {
        files: true,
      },
    })

    if (!data) {
      return null
    }

    return new Upload({
      ...data,
      files: data.files.map(file => new File(file)),
    })
  }

  async update(data: Upload): Promise<void> {
    await this.db.upload.update({
      data: new UploadMapper(data).toPrisma(),
      where: {
        id: data.id,
      },
    })
  }

  async delete(id: string): Promise<void> {
    await this.db.upload.delete({
      where: {
        id,
      },
    })
  }
}
