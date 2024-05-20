import Component from './component'
import { QuestionInputDefaultProp } from './default'
import PropComponent from './PropComponent'
//组件类型
export * from './type'

// 组件的配置
export default {
  title: '输入框',
  type: 'QuestionInput',
  Component,
  PropComponent,
  defaultProps: QuestionInputDefaultProp,
}
