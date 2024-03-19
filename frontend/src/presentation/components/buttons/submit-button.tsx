import { cn } from '@/presentation/helpers/format.js'
import type { ReactNode } from 'react'
import { Spinner } from '../spinner'

export interface SubmitButtonProps {
  children: ReactNode
  isFetching: boolean
  className?: string
  isDisabled?: boolean
}

export function SubmitButton(props: SubmitButtonProps): React.JSX.Element {
  const { children, isFetching, className, isDisabled } = props

  return (
    <button
      data-testid="submit-button"
      className={cn(
        'relative mx-auto mt-4 flex w-4/5 max-w-sm items-center justify-center rounded bg-purple-700 px-1.5 py-1 text-lg text-white transition hover:bg-purple-600 disabled:opacity-50',
        className
      )}
      type="submit"
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      disabled={isDisabled || isFetching}
    >
      {isFetching ? (
        <Spinner className="ml-1 h-6 w-5 fill-zinc-100 text-zinc-500" />
      ) : (
        children
      )}
    </button>
  )
}
