import type { Upload } from '@/domain/models/upload-model.js'
import { Main } from '@/presentation/components/index.js'
import {
  formatBytes,
  formatDateDifferenceInDays,
} from '@/presentation/helpers/format.js'
import { formatRequest } from '@/presentation/helpers/request.js'
import { useFetch } from '@/presentation/hooks/use-fetch.js'
import { MdDownload } from 'react-icons/md'
import { useParams } from 'react-router-dom'

export function DownloadPage(): React.JSX.Element {
  const { uploadId } = useParams()

  const { data: upload } = useFetch<Upload>(`/upload/${uploadId}`)

  return (
    <Main>
      {!!upload?.expiresAt && (
        <p className="my-1 text-center">
          Expira em {formatDateDifferenceInDays(upload.expiresAt)} dias
        </p>
      )}
      <div
        className={`mx-auto grid w-3/4 ${upload?.title || upload?.message ? 'max-w-screen-lg grid-cols-2' : 'max-w-screen-sm grid-cols-1'} gap-x-4 border-2 border-zinc-700 bg-zinc-800 p-2`}
      >
        {/* eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing */}
        {!!(upload?.title || upload?.message) && (
          <div className="flex flex-col gap-2 p-2">
            <h2 className="text-center">Upload</h2>
            {!!upload.title && (
              <h3 className="rounded border border-zinc-600 bg-zinc-900 p-1.5">
                {upload.title}
              </h3>
            )}
            {!!upload.message && (
              <p className="h-full rounded border border-zinc-600 bg-zinc-900 p-1.5">
                {upload.message}
              </p>
            )}
          </div>
        )}
        <div className="flex flex-col gap-2 p-2">
          <h2 className="text-center">Arquivos</h2>
          <div className="flex max-h-72 flex-col gap-1.5 overflow-y-auto">
            {upload?.files.map(file => (
              <a
                key={file.id}
                href={formatRequest('download/file', file.id)}
                className="flex items-center gap-3 rounded border border-zinc-600 bg-zinc-900 p-1.5 hover:border-zinc-500"
              >
                <p className="line-clamp-1 w-full">{file.name}</p>
                <span className="shrink-0 text-sm">
                  {formatBytes(file.size)}
                </span>
                <MdDownload size={20} className="shrink-0 text-indigo-500" />
              </a>
            ))}
          </div>
          <a
            href={formatRequest('download/upload', upload?.id)}
            className="rounded bg-indigo-500 p-2 text-center transition hover:bg-indigo-500/90"
          >
            Download
          </a>
        </div>
      </div>
    </Main>
  )
}
