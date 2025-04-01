import { cn } from '@/presentation/helpers/format.js'
import type { ComponentProps } from 'react'

export type InputType<
  U extends React.HTMLInputTypeAttribute = React.HTMLInputTypeAttribute,
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
  return (
    <input
      {...props}
      className={cn(
        'font-lato rounded-xs border-zinc-600 bg-transparent px-[5px] py-[3px] text-base text-white [color-scheme:dark] outline-hidden transition placeholder:text-base placeholder:text-zinc-400/60 hover:border-zinc-400 focus:border-blue-500 disabled:border disabled:bg-zinc-200',
        props.className
      )}
    />
  )
}
