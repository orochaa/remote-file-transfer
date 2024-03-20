import clsx from 'clsx'
import { useCallback, useEffect, useState } from 'react'
import { MdContentCopy, MdDone } from 'react-icons/md'

export interface CopyButtonProps {
  value: string
  className?: string
}

export function CopyButton(props: CopyButtonProps): React.JSX.Element {
  const { value, className } = props

  const [isCopied, setIsCopied] = useState<boolean>(false)

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(value)
    setIsCopied(true)
  }, [value])

  useEffect(() => {
    setIsCopied(false)
  }, [value])

  return (
    <button
      type="button"
      className={clsx(
        'flex items-center gap-1 rounded border border-zinc-600 bg-dark-modal p-1 font-lato text-base shadow-md',
        className
      )}
      onClick={handleCopy}
    >
      <p className="line-clamp-1 w-full whitespace-nowrap">{value}</p>
      <div className="relative pl-3">
        <div
          className={clsx(
            'absolute left-1.5 top-0 h-5 w-[1px]',
            isCopied ? 'bg-green-600' : 'bg-zinc-400'
          )}
        />
        {isCopied ? (
          <MdDone size={18} className="text-green-600" />
        ) : (
          <MdContentCopy size={18} className="text-zinc-400" />
        )}
      </div>
    </button>
  )
}
