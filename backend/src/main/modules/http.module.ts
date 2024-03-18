import { UploadFileController } from '#presentation/controllers/upload-file.controller.js'
import { UploadFile } from '#services/usecases/upload-file.service.js'
import { PrismaService } from '#infra/database/postgres/prisma.service.js'
import { UploadRepository } from '#infra/database/postgres/upload-repository.js'
import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import { resolve } from 'node:path'

@Module({
  imports: [MulterModule.register({ dest: resolve('public/uploads') })],
  controllers: [UploadFileController],
  providers: [PrismaService, UploadRepository, UploadFile],
})
export class HttpModule {}
