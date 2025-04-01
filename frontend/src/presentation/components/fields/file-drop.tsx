import { cn } from '@/presentation/helpers/format.js'
import { useCallback, useState } from 'react'
import type { ChangeEvent, DragEvent } from 'react'

const handleEvent = (event: DragEvent): void => {
  event.preventDefault()
  event.stopPropagation()
}

export interface FileDropProps {
  id?: string
  className?: string
  accept: string
  multiple?: boolean
  required?: boolean
  onDrop: (files: FileList | File[]) => void
}

export function FileDrop(props: FileDropProps): React.JSX.Element {
  const {
    id = 'file-drop',
    onDrop,
    accept,
    multiple,
    className,
    required,
  } = props

  const [isDrag, setIsDrag] = useState<boolean>(false)
  const [filesName, setFilesName] = useState<string[]>([])

  const limitResponse = useCallback(
    <T,>(array: T[]): T[] => {
      return multiple ? array : [array[0]]
    },
    [multiple]
  )

  const validExtension = useCallback(
    (fileName: string): boolean => {
      if (accept === '*') {
        return true
      }

      const extensionIndex = fileName.lastIndexOf('.')
      const fileExtension = fileName.slice(extensionIndex)
      const validExtensions = accept
        .split(/,/g)
        .map(ext => ext.trim())
        .flatMap(ext => (ext === 'image/*' ? ['.jpeg', '.jpg', '.png'] : [ext]))

      return validExtensions.includes(fileExtension)
    },
    [accept]
  )

  const getFilesName = useCallback(
    (files: FileList | File[]): string[] => {
      if (files.length === 0) {
        return []
      }
      const names = [...files].map(file => file.name)

      return limitResponse(names)
    },
    [limitResponse]
  )
  const getDraggedFiles = useCallback(
    (e: DragEvent): File[] => {
      const files: File[] = []

      if (e.dataTransfer.items.length > 0) {
        for (const item of e.dataTransfer.items) {
          if (item.kind === 'file') {
            const file = item.getAsFile()

            if (file && validExtension(file.name)) {
              files.push(file)
            }
          }
        }
      } else if (e.dataTransfer.files.length > 0) {
        for (const file of e.dataTransfer.files) {
          if (validExtension(file.name)) {
            files.push(file)
          }
        }
      }

      return limitResponse(files)
    },
    [limitResponse, validExtension]
  )

  const handleDragEnter = useCallback((event: DragEvent) => {
    handleEvent(event)
    setIsDrag(true)
  }, [])

  const handleDragOver = useCallback(
    (event: DragEvent) => {
      handleEvent(event)

      if (!isDrag) {
        setIsDrag(true)
      }
    },
    [isDrag]
  )

  const handleDragLeave = useCallback((event: DragEvent) => {
    handleEvent(event)
    setIsDrag(false)
  }, [])

  const handleDrop = useCallback(
    (event: DragEvent) => {
      handleEvent(event)
      setIsDrag(false)
      const files = getDraggedFiles(event)
      setFilesName(getFilesName(files))
      onDrop(files)
      event.dataTransfer.clearData()
    },
    [getDraggedFiles, getFilesName, onDrop]
  )

  const handleFilesSelection = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      const { files } = event.target

      if (!files?.length) {
        return
      }

      setFilesName(getFilesName(files))
      onDrop(files)
    },
    [getFilesName, onDrop]
  )

  return (
    <div
      role="listbox"
      tabIndex={0}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        'relative flex flex-col rounded-xs border p-2 text-center transition',
        filesName.length > 0 ? 'border-solid' : 'border-dashed',
        isDrag ? 'border-indigo-500' : 'border-zinc-500 hover:border-zinc-400',
        className
      )}
    >
      <input
        type="file"
        id={id}
        className="hidden"
        required={required}
        accept={accept}
        multiple={multiple}
        onChange={handleFilesSelection}
      />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor={id} className="absolute inset-0 cursor-pointer" />
      {isDrag ? (
        <span>Soltar Arquivo</span>
      ) : filesName.length > 0 ? (
        <>
          <span className="font-semibold text-zinc-200">
            Arquivos carregados:
          </span>
          {filesName.map((name, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <span key={i} className="line-clamp-1 text-ellipsis">
              {name}
            </span>
          ))}
        </>
      ) : (
        <span>Arrastar Arquivo Aqui</span>
      )}
    </div>
  )
}
