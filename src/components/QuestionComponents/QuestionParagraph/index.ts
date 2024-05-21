import Component from './comopnent'
import PropComponent from './PropComponent'
import { QuestionParagrapPropsDefault } from './default'

//组件类型
export * from './type'

// 组件的配置
export default {
  title: '段落',
  type: 'QuestionParagrap',
  Component,
  PropComponent,
  defaultProps: QuestionParagrapPropsDefault,
}
