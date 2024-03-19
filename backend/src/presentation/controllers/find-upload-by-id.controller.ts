import { UploadMapper } from '#domain/mappers/upload-mapper.js'
import { FindUploadByIdService } from '#services/usecases/find-upload-by-id.service.js'
import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common'

@Controller()
export class FindUploadByIdController {
  constructor(private readonly findUploadByIdService: FindUploadByIdService) {}

  @Get('upload/:uploadId')
  async handle(
    @Param('uploadId', ParseUUIDPipe) uploadId: string
  ): Promise<ReturnType<UploadMapper['toHttp']>> {
    const upload = await this.findUploadByIdService.fundById(uploadId)

    return new UploadMapper(upload).toHttp()
  }
}
