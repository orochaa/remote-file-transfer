import { cn } from '@/presentation/helpers/format.js'
import type { ComponentProps } from 'react'

export type InputType<
  U extends React.HTMLInputTypeAttribute = React.HTMLInputTypeAttribute,
  // eslint-disable-next-line @typescript-eslint/ban-types
> = U extends undefined ? never : Equal<U, string & {}> extends true ? never : U

export type InputProps<TType extends InputType> = ComponentProps<'input'> &
  (TType extends 'file'
    ? {
        accept: string
        multiple: boolean
      }
    : {
        value?: string
      })

export function Input<TType extends InputType>(
  props: InputProps<TType>
): React.JSX.Element {
  const isCheckbox = props.type === 'checkbox'
  const isFile = props.type === 'file'

  return (
    <input
      {...props}
      className={cn(
        'transition',
        isCheckbox && 'accent-blue-500 dark:accent-blue-600',
        isFile &&
          'file:rounded-sm file:border file:border-solid file:border-zinc-400 file:hover:border-zinc-600 dark:file:border-zinc-700/60 dark:file:bg-zinc-900/90 dark:file:text-white-base dark:file:hover:border-white-base',
        !isFile &&
          !isCheckbox &&
          'rounded-sm border-zinc-400 px-[5px] py-[3px] font-lato text-base text-[#2f2f2f] outline-none placeholder:text-base hover:border-zinc-600 focus:border-hover-blue disabled:border disabled:bg-zinc-200 dark:border-zinc-600/60 dark:bg-transparent dark:text-white dark:placeholder:text-zinc-400/60 dark:hover:border-white-base dark:focus:border-blue-500',
        props.className
      )}
    />
  )
}
