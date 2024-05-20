import { ConmponentPropsType } from '@/components/QuestionComponents'
export interface ComponentInfoInterface {
  uuid: string
  type: string
  title: string
  isHidden?: boolean
  isLocked?: boolean
  props: ConmponentPropsType
}
export type ComponentStateType = {
  componentList: Array<ComponentInfoInterface>
  selectledId?: string
}

export type StateType = {}
