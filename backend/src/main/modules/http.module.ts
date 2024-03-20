import { DownloadFileController } from '#presentation/controllers/download-file.controller.js'
import { DownloadUploadController } from '#presentation/controllers/download-upload.controller.js'
import { FindUploadByIdController } from '#presentation/controllers/find-upload-by-id.controller.js'
import { UploadController } from '#presentation/controllers/upload.controller.js'
import { FindFileByIdService } from '#services/usecases/find-file-by-id.service.js'
import { FindUploadByIdService } from '#services/usecases/find-upload-by-id.service.js'
import { ScheduledExpirationService } from '#services/usecases/scheduled-expiration.service.js'
import { UploadService } from '#services/usecases/upload.service.js'
import { ArchiverAdapter } from '#infra/data/arquiver-adapter.js'
import { FileRepository } from '#infra/database/postgres/file-repository.js'
import { PrismaService } from '#infra/database/postgres/prisma.service.js'
import { UploadRepository } from '#infra/database/postgres/upload-repository.js'
import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import { ScheduleModule } from '@nestjs/schedule'
import { resolve } from 'node:path'

@Module({
  imports: [
    MulterModule.register({ dest: resolve('public/uploads') }),
    ScheduleModule.forRoot(),
  ],
  controllers: [
    UploadController,
    FindUploadByIdController,
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
    FindUploadByIdService,
    FindFileByIdService,
    ScheduledExpirationService,
  ],
})
export class HttpModule {}
