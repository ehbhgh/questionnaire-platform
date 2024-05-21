export interface OptionType {
  text: string
  value: string
  checked?: boolean
}

interface listType<T> {
  disabled?: boolean
  onChange?: (newProps: T) => void
}

export interface QuestionCheckBoxInterface extends listType<QuestionCheckBoxInterface> {
  title?: string
  isVertical?: boolean
  list?: Array<OptionType>
}
