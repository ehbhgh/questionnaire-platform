//标题
export interface QuestionTitleInterface {
  text?: string
  level?: 1 | 2 | 3 | 4 | 5
  isCenter?: boolean
  disabled?: boolean
  onChange?: (newProps: QuestionTitleInterface) => void
}

export type QuestionTitleFontSizeInterface = {
  [key: number]: string
}
