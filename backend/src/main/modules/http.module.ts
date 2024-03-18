import { DownloadUploadController } from '#presentation/controllers/download-upload.controller.js'
import { UploadServiceController } from '#presentation/controllers/upload-file.controller.js'
import { DownloadUploadService } from '#services/usecases/download-upload.service.js'
import { UploadService } from '#services/usecases/upload.service.js'
import { ArchiverAdapter } from '#infra/data/arquiver-adapter.js'
import { PrismaService } from '#infra/database/postgres/prisma.service.js'
import { UploadRepository } from '#infra/database/postgres/upload-repository.js'
import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import { resolve } from 'node:path'

@Module({
  imports: [MulterModule.register({ dest: resolve('public/uploads') })],
  controllers: [UploadServiceController, DownloadUploadController],
  providers: [
    PrismaService,
    UploadRepository,
    {
      provide: ArchiverAdapter,
      useFactory: (): ArchiverAdapter => {
        return new ArchiverAdapter(
          resolve('public/uploads'),
          resolve('public/zip')
        )
      },
    },
    UploadService,
    DownloadUploadService,
  ],
})
export class HttpModule {}
