import Component from './component'
import PropComponent from './PropComponent'
import { QuestionCheckBoxPropDefault } from './default'

//组件类型
export * from './type'

// 组件的配置
export default {
  title: '多选',
  type: 'QuestionCheckBox',
  Component,
  PropComponent,
  defaultProps: QuestionCheckBoxPropDefault,
}
