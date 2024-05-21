import Component from './component'
import PropComponent from './PropComponent'
import { QuestionRadioPropDefault } from './default'

//组件类型
export * from './type'

// 组件的配置
export default {
  title: '单选',
  type: 'QuestionRadio',
  Component,
  PropComponent,
  defaultProps: QuestionRadioPropDefault,
}
