import { cn } from '@/presentation/helpers/format.js'
import type { ReactNode } from 'react'

export interface TitleProps {
  children: ReactNode
  className?: string
}

export function Title(props: TitleProps): React.JSX.Element {
  return (
    <h2
      data-testid="title"
      className={cn(
        'mx-0 my-5 w-full border-b-[1px] border-stone-400 p-1 text-xl font-semibold text-black dark:border-zinc-400/80 dark:text-white md:text-2xl',
        props.className
      )}
    >
      {props.children}
    </h2>
  )
}
