import type { Upload } from '#domain/entities/upload.js'
import { UploadRepository } from '#infra/database/postgres/upload-repository.js'
import { Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class FindUploadByIdService {
  constructor(private readonly findUploadByIdRepository: UploadRepository) {}

  async fundById(uploadId: string): Promise<Upload> {
    const upload = await this.findUploadByIdRepository.findById(uploadId)

    if (!upload) {
      throw new NotFoundException('Upload not found')
    }

    return upload
  }
}
