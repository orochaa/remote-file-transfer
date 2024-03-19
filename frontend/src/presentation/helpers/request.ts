import type { File } from '@/domain/models/file-model.js'
import type { Upload } from '@/domain/models/upload-model.js'

export function formatRequest(...uri: (string | undefined)[]): string {
  const api = import.meta.env.VITE_API_URL
  const url = [
    api,
    uri.filter(Boolean).map(e => encodeURI(e).replaceAll(/(^\/+|\/+$)/g, '')),
  ]
    .flat()
    .join('/')

  return url
}

export function handleDownload(
  type: 'file' | 'upload',
  download: File | Upload | undefined
) {
  return (): void => {
    if (!download?.id) {
      return
    }

    fetch(formatRequest('download', type, download.id), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/octet-stream',
      },
    })
      .then(async res => res.blob())
      .then(blob => {
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = download.name

        document.body.append(link)
        link.click()
      })
      .catch(console.error)
  }
}
