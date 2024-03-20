import { Input } from '@/presentation/components'
import type { InputProps, InputType } from '@/presentation/components'
import { formatPlaceholder } from '@/presentation/helpers/format.js'
import clsx from 'clsx'

export interface InputFieldProps<T extends InputType> {
  label: {
    text: string
  }
  input: Omit<InputProps<T>, 'className'>
}

export function InputField<T extends InputType>(
  props: InputFieldProps<T>
): React.JSX.Element {
  const { label, input } = props

  return (
    <div data-testid="input-field" className="mb-4">
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label
        className="m-[5px 0 3px 3px] block font-raleway text-xl font-bold dark:text-white"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: label.text }}
      />
      <Input
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {...(input as any)}
        className={clsx(
          'mt-1  w-full text-lg',
          input.type !== 'file' &&
            'border-0 border-b-2  border-b-zinc-400 focus:border-b-blue-500'
        )}
        placeholder={input.placeholder ?? formatPlaceholder(label.text)}
      />
    </div>
  )
}
