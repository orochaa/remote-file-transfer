/* eslint-disable react/jsx-no-bind */
import { type Upload } from '@/domain/models/upload-model.js'
import {
  Container,
  FileDrop,
  Form,
  InputField,
  SubmitButton,
} from '@/presentation/components/index.js'
import { Main } from '@/presentation/components/main.js'
import { formatRequest } from '@/presentation/helpers/request.js'
import { useCallback, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

const today = new Date()

interface UploadForm {
  files: FileList
  title: string
  message: string
  expiresAt: string
}

export function UploadPage(): React.JSX.Element {
  const [downloadUrl, setDownloadUrl] = useState<string>('')

  const {
    control,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<UploadForm>({
    defaultValues: {
      title: '',
      message: '',
      expiresAt: new Date(
        today.getFullYear(),
        today.getMonth(),
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        today.getDate() + 7
      ).toISOString(),
    },
  })

  const onSubmit = useCallback(async (form: UploadForm) => {
    const formData = new FormData()

    formData.append('title', form.title)
    formData.append('message', form.message)
    formData.append('expiresAt', new Date(form.expiresAt).toISOString())

    for (const file of form.files) {
      formData.append('files', file)
    }

    return fetch(formatRequest('upload'), {
      method: 'post',
      body: formData,
    })
      .then(async res => res.json() as Promise<Upload>)
      .then(data => setDownloadUrl(location.href + data.id))
      .catch(console.error)
  }, [])

  return (
    <Main>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto w-fit min-w-96"
      >
        <Controller
          name="files"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <FileDrop
              accept="*"
              onDrop={files => field.onChange(files)}
              multiple
            />
          )}
        />
        {!!errors.files && (
          <span className="my-2 block text-center text-sm font-semibold text-red-500">
            Arquivos Faltando
          </span>
        )}

        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <InputField
              label={{ text: 'Título' }}
              input={{
                ...field,
                type: 'text',
              }}
            />
          )}
        />

        <Controller
          name="message"
          control={control}
          render={({ field }) => (
            <InputField
              label={{ text: 'Mensagem' }}
              input={{
                ...field,
                type: 'text',
              }}
            />
          )}
        />

        <Controller
          name="expiresAt"
          control={control}
          render={({ field }) => (
            <InputField
              label={{ text: 'Expira em' }}
              input={{
                ...field,
                type: 'date',
                value: new Date(field.value)
                  .toLocaleDateString('pt-br')
                  .split('/')
                  .reverse()
                  .join('-'),
                disabled: true,
              }}
            />
          )}
        />

        <SubmitButton isFetching={isLoading}>Enviar</SubmitButton>
      </Form>

      {!!downloadUrl && (
        <Container className="mx-auto w-fit min-w-40 border-2 border-zinc-400 bg-zinc-100 p-2">
          <h2 className="m-0 p-2 text-center">Link para download</h2>
          <p className="text-center">{downloadUrl}</p>
        </Container>
      )}
    </Main>
  )
}
