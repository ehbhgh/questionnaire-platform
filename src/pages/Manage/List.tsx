import React, { FC, useState, useEffect, useRef } from 'react'
import { useTitle, useDebounceFn, useRequest } from 'ahooks'
import { useSearchParams } from 'react-router-dom'
import { getQuestionListService } from '@/apis/qusetion'
import { Typography, Divider, Spin, Empty } from 'antd'
import { ListSearchConstant } from '@/constant'
import QuestionCard from '@/components/QuestionCard'
import ListSearch from '@/components/ListSearch'
import styles from './css/common.module.scss'
import type { ListResponseItemInterface } from '@/types/list'
const { Title } = Typography

const List: FC = () => {
  useTitle('问卷调查-我的问卷')
  const footerRefs = useRef<HTMLDivElement>(null)
  const contentRefs = useRef<HTMLDivElement>(null)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [list, setList] = useState([])
  const [searchParams] = useSearchParams()
  //拿到keyWord
  const keyword = searchParams.get(ListSearchConstant.LIST_SEARCH_PARAM_KEY) || ''
  //加载完毕,总数比数组的长度要大，表示加载完毕
  const haveMoreData = total > list.length

  //下拉加载触发请求
  const { run: load, loading } = useRequest(
    async () => {
      const data = await getQuestionListService({
        page,
        pageSize: 10,
        keyword,
      })
      return data
    },
    {
      manual: true,
      onSuccess: data => {
        const { list: l = [], total = 0 } = data
        setList(list.concat(l))
        setTotal(total)
        setPage(page + 1)
      },
    }
  )
  //触发页面加载
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const containerEle = contentRefs.current
      const footerEle = footerRefs.current
      if (!containerEle || !footerEle) return
      // //底部元素露出到最上面的距离小于页面高度
      console.log(containerEle?.scrollHeight)
      console.log(containerEle?.scrollTop)
      console.log(containerEle?.clientHeight)

      if (
        //滚动条滚动的高度小于可视区域的高度+底部元素高度
        containerEle?.scrollHeight - containerEle?.scrollTop <=
        containerEle?.clientHeight + footerEle?.offsetHeight
      ) {
        load()
      }
    },
    {
      wait: 1000,
    }
  )

  //判断底部元素是不是露出
  const LoadMoreContentElem = () => {
    if (loading)
      return (
        <div style={{ textAlign: 'center' }}>
          <Spin />
        </div>
      )
    if (total === 0) {
      return <Empty></Empty>
    }
    if (!haveMoreData) {
      return <span>没有更多数据...</span>
    }
    return <span>加载更多...</span>
  }

  //1.页面刷新或加载完成时加载,需要有页面url（keyword）发生改变的触发条件
  useEffect(() => {
    tryLoadMore()
  }, [searchParams])
  //2.下拉滚动时加载
  useEffect(() => {
    //haveMoreData判断还有没有更多的数据
    const containerEle = contentRefs.current
    if (haveMoreData) {
      containerEle?.addEventListener('scroll', tryLoadMore)
    }
    return () => {
      //解绑事件
      containerEle?.removeEventListener('scroll', tryLoadMore)
    }
  }, [searchParams, haveMoreData])

  //搜索时需要重置参数，重新加载
  useEffect(() => {
    setPage(1), setList([]), setTotal(0)
  }, [keyword])
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <Divider style={{ margin: '12px', background: 'transparent' }} />
      <div className={styles.listContent} ref={contentRefs}>
        <div className={styles.content}>
          {list.length > 0 &&
            list.map((item: ListResponseItemInterface) => (
              <QuestionCard key={item._id} {...item} />
            ))}
        </div>
        <div className={styles.footer}>
          <div ref={footerRefs}>{LoadMoreContentElem()}</div>
        </div>
      </div>
    </div>
  )
}

export default List
