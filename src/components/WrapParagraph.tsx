import React from 'react'
import { Typography } from 'antd'
const { Paragraph } = Typography
const WrapParagraph = (props: { text: string; isCenter: boolean }) => {
  const { text = '', isCenter = false } = { ...props }
  const textList = text.split('\n')
  return (
    <Paragraph
      style={{
        textAlign: isCenter ? 'center' : 'start',
        marginBottom: '0',
      }}
    >
      {textList.map((t, i) => (
        <span key={i}>
          {i > 0 && <br />}
          {t}
        </span>
      ))}
    </Paragraph>
  )
}

export default WrapParagraph
