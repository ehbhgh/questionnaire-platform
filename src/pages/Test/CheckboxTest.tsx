import React, { FC, useState, ChangeEvent } from 'react'

const CheckboxTest: FC = () => {
  const [checkedMap, setCheckedMap] = useState<{ [key: string]: boolean }>({
    teacher: false,
    police: false,
    doctor: false,
    programmer: false,
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setCheckedMap({
      ...checkedMap,
      [value]: !checkedMap[value],
    })
  }

  return (
    <div style={{ margin: '200px' }}>
      <h1 style={{ marginBottom: '40px' }}>
        CheckboxTestDemo:
        <p>
          {Object.keys(checkedMap).map(key =>
            checkedMap[key] ? (
              <span key={key} style={{ marginLeft: '20px' }}>
                {key}
              </span>
            ) : null
          )}
        </p>
      </h1>
      <label htmlFor="checkbox1">老师</label>
      <input
        type="checkbox"
        name=""
        id="checkbox1"
        value="teacher"
        onChange={handleChange}
        checked={checkedMap['teacher']}
      />
      <label htmlFor="checkbox2">警察</label>
      <input
        type="checkbox"
        name=""
        id="checkbox2"
        value="police"
        onChange={handleChange}
        checked={checkedMap['police']}
      />

      <label htmlFor="checkbox3">医生</label>
      <input
        type="checkbox"
        name=""
        id="checkbox3"
        value="doctor"
        onChange={handleChange}
        checked={checkedMap['doctor']}
      />
      <label htmlFor="checkbox4">程序员</label>
      <input
        type="checkbox"
        name=""
        id="checkbox4"
        value="programmer"
        onChange={handleChange}
        checked={checkedMap['programmer']}
      />
    </div>
  )
}

export default CheckboxTest
