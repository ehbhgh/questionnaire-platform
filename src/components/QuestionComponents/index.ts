import QuestionInputInfo, { QuestionInputInterface } from './QuestionInput'
import QuestionTitleInfo, { QuestionTitleInterface } from './QuestionTitle'
import QuestionParagraphInfo, { QuestionParagraphInterface } from './QuestionParagraph'
import QuestionInfoConf, { QuestionInfoInterface } from './QuestionInfo'
import QuestionTextAreaInfo, { QuestionTextAreaInterface } from './QuestionTextArea'
import QuestionRadioInfo, { QuestionRadioInterface } from './QuestionRadio'
import QuestionCheckBoxInfo, { QuestionCheckBoxInterface } from './QuestionCheckBox'
import type { FC } from 'react'

// 导出各个组件的类型
export type ComponentPropsType = QuestionInputInterface &
  QuestionTitleInterface &
  QuestionParagraphInterface &
  QuestionInfoInterface &
  QuestionTextAreaInterface &
  QuestionRadioInterface &
  QuestionCheckBoxInterface

//组件配置信息类型
export type ComponentConType = {
  type: string
  title: string
  Component: FC<ComponentPropsType>
  PropComponent: FC<ComponentPropsType>
  defaultProps: ComponentPropsType
}

//组件列表配置信息
const ComponentListConf: ComponentConType[] = [
  QuestionTitleInfo,
  QuestionParagraphInfo,
  QuestionInfoConf,
  QuestionInputInfo,
  QuestionTextAreaInfo,
  QuestionRadioInfo,
  QuestionCheckBoxInfo,
]

// 根据组件类型获取组件配置信息
export function getComponentConfByType<T>(type: T): ComponentConType | undefined {
  // 获取组件配置信息
  return ComponentListConf.find(item => item.type === type)
}

//组件分组类型
interface componentConGroup {
  groupId: number
  groupName: string
  components: ComponentConType[]
}
//组件分组
export function componentConGroup(): Array<componentConGroup> {
  return [
    {
      groupId: 1,
      groupName: '文本显示',
      components: [QuestionTitleInfo, QuestionParagraphInfo, QuestionInfoConf],
    },
    {
      groupId: 2,
      groupName: '用户输入',
      components: [QuestionInputInfo, QuestionTextAreaInfo],
    },

    {
      groupId: 3,
      groupName: '用户选择',
      components: [QuestionRadioInfo, QuestionCheckBoxInfo],
    },
  ]
}
