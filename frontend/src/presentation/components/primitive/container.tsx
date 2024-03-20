import { cn } from '@/presentation/helpers/format.js'
import type { HTMLAttributes, ReactNode } from 'react'

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function Container(props: ContainerProps): React.JSX.Element {
  return (
    <div
      {...props}
      className={cn(
        'flex flex-col rounded border-2 border-zinc-700 bg-zinc-900 p-5',
        props.className
      )}
    >
      {props.children}
    </div>
  )
}
