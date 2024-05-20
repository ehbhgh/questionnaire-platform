import Component from './component'
import PropComponent from './PropComponent'
import { QuestionTitleDefaultProp } from './default'

//组件类型
export * from './type'

// 组件的配置
export default {
  title: '标题',
  type: 'QuestionTitle',
  Component,
  PropComponent,
  defaultProps: QuestionTitleDefaultProp,
}
