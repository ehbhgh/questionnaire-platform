export interface ListResponseItemInterface {
  _id: string
  title: string
  isPublished: boolean
  isStar: boolean
  answerCount: number
  createAt: string
  isDeleted: boolean
}

export interface ListResponseInterface {
  data: ListResponseItemInterface[]
  total: number
}

export interface SearchOptionInterface {
  keyword: string
  isDeleted: boolean
  isStar: boolean
  pageSize: number
  page: number
}

export type ExtendOptionInterface = Partial<Exclude<SearchOptionInterface, 'keyword'>>
