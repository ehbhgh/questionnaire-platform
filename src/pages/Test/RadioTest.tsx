import React, { FC, useState, ChangeEvent } from 'react'
const RadioTest: FC = () => {
  const [gender, setGender] = useState<string>('male')
  const handelChange = (event: ChangeEvent<HTMLInputElement>) => {
    setGender(event.target.value)
  }

  const handelClick = () => {
    console.log(gender)
  }
  return (
    <div style={{ margin: '200px' }}>
      <h1>radiodemo1</h1>
      <label htmlFor="radio1">男</label>
      <input
        type="radio"
        name="gender"
        id="radio1"
        checked={gender === 'male'}
        value="male"
        onChange={handelChange}
      />
      <label htmlFor="radio2">女</label>
      <input
        type="radio"
        name="gender"
        id="radio2"
        value="female"
        onChange={handelChange}
        checked={gender === 'female'}
      />

      <button onClick={handelClick}>提交</button>
    </div>
  )
}

export default RadioTest
