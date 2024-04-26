import React, { FC, useState, ChangeEvent } from 'react'
const Test: FC = () => {
  const [value, setValue] = useState<string>('hello')
  const handelChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value)
  }
  const getHtml = () => {
    return {
      __html: value.replaceAll('\n', '<br>'),
    }
  }
  return (
    <div>
      <h1>demo</h1>
      <h3 style={{ margin: '20px 0px' }} dangerouslySetInnerHTML={getHtml()}></h3>
      <textarea value={value} onChange={handelChange} cols={30} rows={10}></textarea>
    </div>
  )
}

export default Test
