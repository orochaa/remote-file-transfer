import { UploadMapper } from '#domain/mappers/upload-mapper.js'
import { UploadService } from '#services/usecases/upload.service.js'
import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common'
import { AnyFilesInterceptor } from '@nestjs/platform-express'
import { IsDateString, IsString } from 'class-validator'

class UploadBodyDto {
  @IsString()
  title: string

  @IsString()
  message: string

  @IsDateString()
  expiresAt: Date
}

@Controller()
export class UploadServiceController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('upload')
  @UseInterceptors(AnyFilesInterceptor())
  async handle(
    @Body() body: UploadBodyDto,
    @UploadedFiles() files: Express.Multer.File[]
  ): Promise<ReturnType<UploadMapper['toHttp']>> {
    const upload = await this.uploadService.upload({
      title: body.title,
      message: body.message,
      size: files.reduce((acc, file) => acc + file.size, 0),
      files: files.map(file => ({
        name: file.filename,
        size: file.size,
        path: file.path,
        mimetype: file.mimetype,
      })),
      expiresAt: body.expiresAt,
    })

    return new UploadMapper(upload).toHttp()
  }
}
