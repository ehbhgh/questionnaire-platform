import { QuestionCheckBoxInterface } from './type'
export const QuestionCheckBoxPropDefault: QuestionCheckBoxInterface = {
  title: '多选标题',
  isVertical: false,
  list: [
    {
      text: '选项1',
      value: 'item1',
      checked: false,
    },
    {
      text: '选项2',
      value: 'item2',
      checked: false,
    },
    {
      text: '选项3',
      value: 'item3',
      checked: false,
    },
  ],
}
