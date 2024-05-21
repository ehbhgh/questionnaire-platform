import React, { FC } from 'react'
import { QuestionParagraphInterface } from './type'
import { QuestionParagrapPropsDefault } from './default'
import WrapParagraph from '@/components/WrapParagraph'
const QuestionParagraph: FC<QuestionParagraphInterface> = (props: QuestionParagraphInterface) => {
  const { text = '', isCenter = false } = { ...QuestionParagrapPropsDefault, ...props }

  return <WrapParagraph {...{ text, isCenter }} />
}

export default QuestionParagraph
