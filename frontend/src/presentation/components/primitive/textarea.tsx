import { cn } from '@/presentation/helpers/format.js'
import type { ComponentProps } from 'react'

interface TextAreaProps extends ComponentProps<'textarea'> {
  placeholder: string
}

export function TextArea(props: TextAreaProps): React.JSX.Element {
  return (
    <textarea
      {...props}
      className={cn(
        'my-2 w-full resize-none border border-zinc-600 bg-zinc-900 p-2 font-lato text-base text-white outline-none placeholder:text-base placeholder:text-zinc-400/50 hover:border-zinc-400 focus:border-blue-500',
        props.className
      )}
    />
  )
}
