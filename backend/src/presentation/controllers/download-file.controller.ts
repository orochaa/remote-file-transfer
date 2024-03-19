/* eslint-disable security/detect-non-literal-fs-filename */
import { FindFileByIdService } from '#services/usecases/find-file-by-id.service.js'
import {
  Controller,
  Get,
  Logger,
  Param,
  ParseUUIDPipe,
  Res,
  StreamableFile,
} from '@nestjs/common'
import { Response } from 'express'
import { createReadStream } from 'node:fs'

@Controller()
export class DownloadFileController {
  constructor(private readonly findFileByIdService: FindFileByIdService) {}

  @Get('download/file/:fileId')
  async handle(
    @Param('fileId', ParseUUIDPipe) fileId: string,
    @Res({ passthrough: true }) res: Response
  ): Promise<StreamableFile> {
    const file = await this.findFileByIdService.findById(fileId)

    res.setHeader('Content-Type', 'application/octet-stream')
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${file.originalName}"`
    )

    return new StreamableFile(createReadStream(file.path)).setErrorHandler(
      err => {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        err && Logger.log(err.message)
      }
    )
  }
}
