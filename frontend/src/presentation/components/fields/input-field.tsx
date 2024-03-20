import { Input } from '@/presentation/components'
import type { InputProps, InputType } from '@/presentation/components'
import { formatPlaceholder } from '@/presentation/helpers/format.js'

export interface InputFieldProps<T extends InputType> {
  label: {
    text: string
  }
  input: Omit<InputProps<T>, 'id' | 'className'>
}

export function InputField<T extends InputType>(
  props: InputFieldProps<T>
): React.JSX.Element {
  const { label, input } = props

  const id = label.text.toLowerCase().replaceAll(/\s+/g, '-')

  return (
    <div data-testid="input-field" className="mb-4">
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label
        htmlFor={id}
        className="m-[5px 0 3px 3px] block font-raleway text-xl font-bold text-white"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: label.text }}
      />
      <Input
        id={id}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {...(input as any)}
        className="mt-1 w-full border-b-2 text-lg focus:border-b-blue-500"
        placeholder={input.placeholder ?? formatPlaceholder(label.text)}
      />
    </div>
  )
}
