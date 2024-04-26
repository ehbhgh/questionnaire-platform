export interface QuestionCardProps {
  _id: string
  title: string
  isPublished: boolean
  isStar: boolean
  answerCount: number
  createAt: string
  delQuestion?: (id: string) => void
  editQuestion?: (id: string) => void
}
