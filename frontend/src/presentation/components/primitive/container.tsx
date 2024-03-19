import { cn } from '@/presentation/helpers/format.js'
import { type HTMLAttributes, type ReactNode } from 'react'

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function Container(props: ContainerProps): React.JSX.Element {
  return (
    <div
      {...props}
      className={cn(
        'flex flex-col rounded bg-white p-5 dark:border-2 dark:border-zinc-700 dark:bg-zinc-900',
        props.className
      )}
    >
      {props.children}
    </div>
  )
}
