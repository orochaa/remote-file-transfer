import { Upload } from '#domain/entities/upload.js'
import { ArchiverAdapter } from '#infra/data/arquiver-adapter.js'
import { UploadRepository } from '#infra/database/postgres/upload-repository.js'
import { BadRequestException, Injectable } from '@nestjs/common'

@Injectable()
export class UploadService {
  constructor(
    private readonly uploadRepository: UploadRepository,
    private readonly archiver: ArchiverAdapter
  ) {}

  async upload(
    data: Omit<Upload.Params, 'name' | 'originalName' | 'mimetype' | 'path'>
  ): Promise<Upload> {
    if (data.files.length === 0) {
      throw new BadRequestException('Missing files')
    }

    const zip = await this.archiver.zip(data.files)

    const upload = new Upload({
      ...data,
      name: zip.name,
      originalName: zip.originalName,
      mimetype: zip.mimetype,
      path: zip.path,
    })
    await this.uploadRepository.create(upload)

    return upload
  }
}
