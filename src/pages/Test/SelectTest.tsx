import React, { FC, useState, ChangeEvent } from 'react'
const SelectTest: FC = () => {
  const [language, setLanguage] = useState<number>(1)
  const languagelist = [
    {
      key: 'Chinese',
      value: 1,
    },
    {
      key: 'English',
      value: 2,
    },
    {
      key: 'Math',
      value: 3,
    },
    {
      key: 'History',
      value: 4,
    },
  ]
  const handelChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setLanguage(Number(event.target.value))
  }

  const filterVal = () => {
    const list = languagelist.find(item => item.value === language)
    return list?.key
  }
  return (
    <div style={{ margin: '200px' }}>
      <h1>SelectTestdemo1,{filterVal()}</h1>
      <select
        name=""
        id="selectDom"
        value={language}
        onChange={handelChange}
        style={{ margin: '30px' }}
      >
        {languagelist.map((item, index) => {
          return (
            <option value={item.value} key={index}>
              {item.key}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default SelectTest
