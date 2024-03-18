/* eslint-disable security/detect-non-literal-fs-filename */
import { File } from '#domain/entities/file.js'
import { Injectable } from '@nestjs/common'
import archiver from 'archiver'
import { randomUUID } from 'node:crypto'
import { createWriteStream } from 'node:fs'
import { join } from 'node:path'

@Injectable()
export class ArchiverAdapter {
  constructor(private readonly zipFolderPath: string) {}

  async zip(files: File[]): Promise<File> {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const zipFileId = randomUUID().slice(0, 4)
    const zipFileName = `remote-file-transfer-${zipFileId}.zip`
    const zip = new File({
      name: zipFileName,
      path: join(this.zipFolderPath, zipFileName),
      mimetype: 'application/zip',
      size: 0,
    })

    const zipStream = createWriteStream(zip.path)
    zipStream.on('error', err => {
      throw err
    })

    const archive = archiver('zip', { zlib: { level: 9 } })
    archive.pipe(zipStream)

    for (const file of files) {
      archive.file(file.path, { name: file.name })
    }

    await archive.finalize()

    return zip
  }
}
