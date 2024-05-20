//输入框
export interface QuestionInputInterface {
  title?: string
  placeholder?: string
  disabled?: boolean
  onChange?: (newProps: QuestionInputInterface) => void
}
