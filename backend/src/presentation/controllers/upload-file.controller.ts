import { UploadMapper } from '#domain/mappers/upload-mapper.js'
import { UploadFile } from '#services/usecases/upload-file.service.js'
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
export class UploadFileController {
  constructor(private readonly uploadFile: UploadFile) {}

  @Post('upload')
  @UseInterceptors(AnyFilesInterceptor())
  async handle(
    @Body() body: UploadBodyDto,
    @UploadedFiles() files: Express.Multer.File[]
  ): Promise<ReturnType<UploadMapper['toHttp']>> {
    const upload = await this.uploadFile.upload({
      title: body.title,
      message: body.message,
      size: files.reduce((acc, file) => acc + file.size, 0),
      files: files.map(file => ({ name: file.filename, size: file.size })),
      expiresAt: body.expiresAt,
    })

    return new UploadMapper(upload).toHttp()
  }
}
