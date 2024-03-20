/* eslint-disable react/jsx-no-bind */
import type { Upload } from '@/domain/models/upload-model.js'
import {
  Container,
  CopyButton,
  FileDrop,
  Form,
  InputField,
  SubmitButton,
  TextArea,
} from '@/presentation/components/index.js'
import { Main } from '@/presentation/components/main.js'
import { formatDateInput } from '@/presentation/helpers/format.js'
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
    formState: { errors, isSubmitting },
  } = useForm<UploadForm>({
    defaultValues: {
      title: '',
      message: '',
      expiresAt: formatDateInput(
        new Date(
          today.getFullYear(),
          today.getMonth(),
          // eslint-disable-next-line @typescript-eslint/no-magic-numbers
          today.getDate() + 7
        )
      ),
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
    <Main className="w-fit min-w-96">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="files"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <FileDrop
              accept="*"
              onDrop={files => field.onChange(files)}
              multiple
              className="my-4"
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
            <>
              <label
                htmlFor="message"
                className="m-[5px 0 3px 3px] block font-raleway text-xl font-bold text-white"
              >
                Mensagem
              </label>
              <TextArea
                {...field}
                id="message"
                placeholder="Digite sua mensagem"
                className="resize"
              />
            </>
          )}
        />

        <Controller
          name="expiresAt"
          control={control}
          render={({ field }) => (
            <InputField
              label={{ text: 'Expira dia' }}
              input={{
                ...field,
                type: 'date',
                value: formatDateInput(field.value),
              }}
            />
          )}
        />

        <SubmitButton isFetching={isSubmitting}>Enviar</SubmitButton>
      </Form>

      {!!downloadUrl && (
        <Container className="mt-2">
          <h2 className="m-0 p-2 text-center">Link para download</h2>
          <CopyButton value={downloadUrl} />
        </Container>
      )}
    </Main>
  )
}
