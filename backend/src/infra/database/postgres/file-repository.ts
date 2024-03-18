import { File } from '#domain/entities/file.js'
import { Injectable } from '@nestjs/common'
import { PrismaService } from './prisma.service'

@Injectable()
export class FileRepository {
  constructor(private readonly db: PrismaService) {}

  async findById(id: string): Promise<File | null> {
    const data = await this.db.file.findUnique({
      where: {
        id,
      },
    })

    if (!data) {
      return null
    }

    return new File(data)
  }
}
