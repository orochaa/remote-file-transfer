import { cn } from '@/presentation/helpers/format.js'
import type { ReactNode } from 'react'

export interface MainProps {
  children: ReactNode
  className?: string
}

export function Main(props: MainProps): React.JSX.Element {
  const { children, className } = props

  return (
    <section
      data-testid="main"
      className="min-h-screen min-w-full bg-zinc-950 py-24 text-white-base"
    >
      <div className={cn('mx-auto w-11/12 max-w-screen-2xl', className)}>
        {children}
      </div>
    </section>
  )
}
