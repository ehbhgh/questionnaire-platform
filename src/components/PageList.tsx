import React, { FC, useEffect, useState } from 'react'
import { Pagination } from 'antd'
import { ListSearchConstant } from '@/constant'
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom'
import type { StarPropsInterface } from '@/types/star'
const PageList: FC<StarPropsInterface> = props => {
  const { total } = props
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const nav = useNavigate()
  const { pathname } = useLocation()
  //从url中获取参数，同步到Pagination组件
  const [searchParams] = useSearchParams()
  useEffect(() => {
    const page = Number(searchParams.get(ListSearchConstant.LIST_PAGE_PARAM_VALUE)) || 1
    setCurrent(page)
    const pageSize = Number(searchParams.get(ListSearchConstant.LIST_PAGESIZE_PARAM_VALUE)) || 10
    setPageSize(pageSize)
  }, [searchParams])
  const handlePageChange = (page: number, pageSize: number) => {
    nav({
      pathname,
      search: `?${ListSearchConstant.LIST_PAGE_PARAM_VALUE}=${page}&${ListSearchConstant.LIST_PAGESIZE_PARAM_VALUE}=${pageSize}`,
    })
  }
  return (
    <Pagination
      total={total}
      current={current}
      pageSize={pageSize}
      style={{ background: '#fff' }}
      onChange={handlePageChange}
    />
  )
}

export default PageList
