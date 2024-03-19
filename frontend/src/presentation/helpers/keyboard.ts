import { type KeyboardEvent } from 'react'

export function enterHandler(cb: () => void) {
  return (event: KeyboardEvent): void => {
    if (event.key === 'Enter') {
      cb()
    }
  }
}
