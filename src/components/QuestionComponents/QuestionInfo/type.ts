export interface QuestionInfoInterface {
  title?: string
  desc?: string
  disabled?: boolean
  onChange?: (newProps: QuestionInfoInterface) => void
}
