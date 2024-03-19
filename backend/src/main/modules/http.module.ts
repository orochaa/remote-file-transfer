import { DownloadFileController } from '#presentation/controllers/download-file.controller.js'
import { DownloadUploadController } from '#presentation/controllers/download-upload.controller.js'
import { UploadController } from '#presentation/controllers/upload.controller.js'
import { DownloadFileService } from '#services/usecases/download-file.service.js'
import { DownloadUploadService } from '#services/usecases/download-upload.service.js'
import { UploadService } from '#services/usecases/upload.service.js'
import { ArchiverAdapter } from '#infra/data/arquiver-adapter.js'
import { FileRepository } from '#infra/database/postgres/file-repository.js'
import { PrismaService } from '#infra/database/postgres/prisma.service.js'
import { UploadRepository } from '#infra/database/postgres/upload-repository.js'
import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import { resolve } from 'node:path'

@Module({
  imports: [MulterModule.register({ dest: resolve('public/uploads') })],
  controllers: [
    UploadController,
    DownloadUploadController,
    DownloadFileController,
  ],
  providers: [
    PrismaService,
    UploadRepository,
    FileRepository,
    {
      provide: ArchiverAdapter,
      useFactory: (): ArchiverAdapter =>
        new ArchiverAdapter(resolve('public/zips')),
    },
    UploadService,
    DownloadUploadService,
    DownloadFileService,
  ],
})
export class HttpModule {}
