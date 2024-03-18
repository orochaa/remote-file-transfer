import type { File } from '#domain/entities/file.js'
import { FileRepository } from '#infra/database/postgres/file-repository.js'
import { Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class DownloadFileService {
  constructor(private readonly findFileByIdRepository: FileRepository) {}

  async download(fileId: string): Promise<File> {
    const file = await this.findFileByIdRepository.findById(fileId)

    if (!file) {
      throw new NotFoundException('File not found')
    }

    return file
  }
}
