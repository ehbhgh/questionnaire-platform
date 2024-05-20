import QuestionInputInfo, { QuestionInputInterface } from './QuestionInput'
import QuestionTitleInfo, { QuestionTitleInterface } from './QuestionTitle'
import type { FC } from 'react'

// 导出各个组件的类型
export type ComponentPropsType = QuestionInputInterface & QuestionTitleInterface

//组件配置信息类型
export type ComponentConType = {
  type: string
  title: string
  Component: FC<ComponentPropsType>
  PropComponent: FC<ComponentPropsType>
  defaultProps: ComponentPropsType
}

//组件列表配置信息
const ComponentListConf: ComponentConType[] = [QuestionInputInfo, QuestionTitleInfo]

// 根据组件类型获取组件配置信息
export function getComponentConfByType<T>(type: T): ComponentConType | undefined {
  // 获取组件配置信息
  return ComponentListConf.find(item => item.type === type)
}

//组件分组
export function componentConGroup() {
  return [
    {
      groupId: 1,
      groupName: '文本显示',
      components: [QuestionTitleInfo],
    },
    {
      groupId: 2,
      groupName: '用户输入',
      components: [QuestionInputInfo],
    },
  ]
}
