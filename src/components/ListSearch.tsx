import React, { FC, useState, ChangeEvent, useEffect } from 'react'
import { Input } from 'antd'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { ListSearchConstant } from '@/constant'
const { Search } = Input
const ListSearch: FC = () => {
  const [value, setValue] = useState<string>('')
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  useEffect(() => {
    const newVal = searchParams.get(ListSearchConstant.LIST_SEARCH_PARAM_KEY)
    if (newVal) {
      setValue(newVal)
    }
  }, [searchParams])
  const handleSearch = (val: string) => {
    navigate({
      pathname,
      search: `?${ListSearchConstant.LIST_SEARCH_PARAM_KEY}=${val}`,
    })
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <Search
      placeholder="请输入关键字"
      allowClear
      value={value}
      onSearch={handleSearch}
      onChange={handleChange}
      style={{ width: '200px' }}
      size="large"
    />
  )
}

export default ListSearch
