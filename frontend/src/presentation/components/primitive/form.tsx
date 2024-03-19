import {
  type FormEvent,
  type HTMLAttributes,
  type ReactNode,
  useCallback,
} from 'react'
import { Container } from './container'

export interface FormProps extends HTMLAttributes<HTMLFormElement> {
  onSubmit: (event: FormEvent) => void
  children: ReactNode
}

export function Form(props: FormProps): React.JSX.Element {
  const { className, children, onSubmit, style, ...rest } = props

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault()
      event.stopPropagation()
      onSubmit(event)
    },
    [onSubmit]
  )

  return (
    <Container className={className} style={style}>
      <form {...rest} onSubmit={handleSubmit}>
        {children}
      </form>
    </Container>
  )
}
