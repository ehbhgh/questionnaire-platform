import Component from './component'
import { QuestionInFoDefaultProp } from './default'
import PropComponent from './PropComponent'
//组件类型
export * from './type'

// 组件的配置
export default {
  title: '问卷信息',
  type: 'QuestionInfo',
  Component,
  PropComponent,
  defaultProps: QuestionInFoDefaultProp,
}
