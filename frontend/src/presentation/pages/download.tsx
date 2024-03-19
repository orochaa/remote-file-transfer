import type { Upload } from '@/domain/models/upload-model.js'
import { Main } from '@/presentation/components/index.js'
import { formatRequest } from '@/presentation/helpers/request.js'
import { useFetch } from '@/presentation/hooks/use-fetch.js'
import { useParams } from 'react-router-dom'

export function DownloadPage(): React.JSX.Element {
  const { uploadId } = useParams()

  const { data: upload } = useFetch<Upload>(`/upload/${uploadId}`)

  return (
    <Main>
      <h1>{upload?.title}</h1>
      <p>{upload?.message}</p>
      <a
        target="_blank"
        rel="noreferrer"
        href={formatRequest('download/upload', upload?.id)}
      >
        Download
      </a>
    </Main>
  )
}
