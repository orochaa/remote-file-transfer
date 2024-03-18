/* eslint-disable security/detect-non-literal-fs-filename */
import type { File } from '#domain/entities/file.js'
import { Injectable } from '@nestjs/common'
import archiver from 'archiver'
import { randomUUID } from 'node:crypto'
import { createWriteStream } from 'node:fs'
import { join } from 'node:path'

@Injectable()
export class ArchiverAdapter {
  constructor(
    private readonly filesFolderPath: string,
    private readonly zipFolderPath: string
  ) {}

  async zip(files: File[]): Promise<{ zipFilePath: string }> {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const zipFileId = randomUUID().slice(0, 4)
    const zipFileName = `remote-file-transfer-${zipFileId}.zip`
    const zipFilePath = join(this.zipFolderPath, zipFileName)

    const zipStream = createWriteStream(zipFilePath)
    zipStream.on('error', err => {
      throw err
    })

    const archive = archiver('zip', { zlib: { level: 9 } })
    archive.pipe(zipStream)

    for (const file of files) {
      archive.file(join(this.filesFolderPath, file.name), { name: file.name })
    }

    await archive.finalize()

    return { zipFilePath }
  }
}
