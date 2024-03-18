import type { File } from '#domain/entities/file.js'
import { ArchiverAdapter } from '#infra/data/arquiver-adapter.js'
import { UploadRepository } from '#infra/database/postgres/upload-repository.js'
import { Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class DownloadUploadService {
  constructor(
    private readonly findUploadByIdRepository: UploadRepository,
    private readonly archiver: ArchiverAdapter
  ) {}

  async download(uploadId: string): Promise<File> {
    const upload = await this.findUploadByIdRepository.findById(uploadId)

    if (!upload) {
      throw new NotFoundException('Upload not found')
    }

    return this.archiver.zip(upload.files)
  }
}
