/* eslint-disable security/detect-non-literal-fs-filename */
import { DownloadUploadService } from '#services/usecases/download-upload.service.js'
import { Controller, Get, Param, StreamableFile } from '@nestjs/common'
import { createReadStream } from 'node:fs'

@Controller()
export class DownloadUploadController {
  constructor(private readonly downloadUpload: DownloadUploadService) {}

  @Get('download/upload/:uploadId')
  async handle(@Param('uploadId') uploadId: string): Promise<StreamableFile> {
    const file = await this.downloadUpload.download(uploadId)

    return new StreamableFile(createReadStream(file.path))
  }
}
