/* eslint-disable security/detect-non-literal-fs-filename */
import { DownloadFileService } from '#services/usecases/download-file.service.js'
import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  StreamableFile,
} from '@nestjs/common'
import { createReadStream } from 'node:fs'

@Controller()
export class DownloadFileController {
  constructor(private readonly downloadFileService: DownloadFileService) {}

  @Get('download/file/:fileId')
  async handle(
    @Param('fileId', ParseUUIDPipe) fileId: string
  ): Promise<StreamableFile> {
    const file = await this.downloadFileService.download(fileId)

    return new StreamableFile(createReadStream(file.path))
  }
}
