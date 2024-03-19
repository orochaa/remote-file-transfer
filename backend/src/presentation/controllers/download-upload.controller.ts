/* eslint-disable security/detect-non-literal-fs-filename */
import { FindUploadByIdService } from '#services/usecases/find-upload-by-id.service.js'
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
export class DownloadUploadController {
  constructor(private readonly findUploadByIdService: FindUploadByIdService) {}

  @Get('download/upload/:uploadId')
  async handle(
    @Param('uploadId', ParseUUIDPipe) uploadId: string,
    @Res({ passthrough: true }) res: Response
  ): Promise<StreamableFile> {
    const upload = await this.findUploadByIdService.fundById(uploadId)

    res.setHeader('Content-Type', 'application/octet-stream')
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${upload.originalName}"`
    )

    return new StreamableFile(createReadStream(upload.path)).setErrorHandler(
      err => {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        err && Logger.log(err.message)
      }
    )
  }
}
