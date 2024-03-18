import { Upload } from '#domain/entities/upload.js'
import { UploadRepository } from '#infra/database/postgres/upload-repository.js'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UploadService {
  constructor(private readonly uploadRepository: UploadRepository) {}

  async upload(data: Upload.Params): Promise<Upload> {
    const upload = new Upload(data)

    await this.uploadRepository.create(upload)

    return upload
  }
}
