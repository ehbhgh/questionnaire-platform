import Component from './component'
import { QuestionTextAreaDefaultProp } from './default'
import PropComponent from './PropComponent'
//组件类型
export * from './type'

// 组件的配置
export default {
  title: '文本域',
  type: 'QuestionTextArea',
  Component,
  PropComponent,
  defaultProps: QuestionTextAreaDefaultProp,
}
