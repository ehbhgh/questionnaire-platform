export interface OptionType {
  text: string
  value: string
}

interface listType<T> {
  disabled?: boolean
  onChange?: (newProps: T) => void
}

export interface QuestionRadioInterface extends listType<QuestionRadioInterface> {
  title?: string
  isVertical?: boolean
  options?: Array<OptionType>
  value?: string
}
