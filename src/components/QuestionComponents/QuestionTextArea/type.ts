//输入框
export interface QuestionTextAreaInterface {
  title?: string
  placeholder?: string
  disabled?: boolean
  onChange?: (newProps: QuestionTextAreaInterface) => void
}
