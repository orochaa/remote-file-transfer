/* eslint-disable security/detect-non-literal-fs-filename */
import { PrismaService } from '#infra/database/postgres/prisma.service.js'
import { Injectable } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { unlink } from 'node:fs/promises'

@Injectable()
export class ScheduledExpirationService {
  constructor(private readonly db: PrismaService) {}

  // Run every day at midnight
  @Cron('0 0 * * *')
  async handle(): Promise<void> {
    try {
      const expiredUploads = await this.db.upload.findMany({
        where: {
          expiresAt: {
            lt: new Date(),
          },
        },
        select: {
          path: true,
          files: {
            select: {
              path: true,
            },
          },
        },
      })

      for (const expiredUpload of expiredUploads) {
        await this.removeFile(expiredUpload.path)

        for (const file of expiredUpload.files) {
          await this.removeFile(file.path)
        }
      }
    } catch (error) {
      console.error('Error processing ScheduledExpirationService:', error)
    }
  }

  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async removeFile(filePath: string): Promise<void> {
    try {
      // Remove file from the file system
      await unlink(filePath)
      process.stdout.write(`File removed: ${filePath}\n`)
    } catch (error) {
      console.error(`Error removing file ${filePath}:`, error)
    }
  }
}
