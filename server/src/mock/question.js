const Mock = require('mockjs')
const getQuestionList = require('./getQuestionList')
const { type } = require('os')
module.exports = [
  //获取单个问卷信息
  {
    url: '/api/question/:id',
    method: 'get',
    response() {
      return {
        code: 200,
        msg: '查询成功',
        data: {
          id: Mock.Random.id(),
          title: Mock.Random.ctitle(),
          componentList: [
            {
              uuid: Mock.Random.id(),
              type: 'QuestionInfo',
              title: '问卷信息',
              isHidden: false,
              isLocked: false,
              props: {
                title: '调查青少年教育问题',
                desc: '关于青少年教育的实时调研',
              },
            },
            {
              uuid: Mock.Random.id(),
              type: 'QuestionTitle',
              title: '标题',
              isHidden: false,
              isLocked: false,
              props: {
                text: '个人信息调研',
                level: 1,
                isCenter: false,
              },
            },
            {
              uuid: Mock.Random.id(),
              type: 'QuestionInput',
              title: '输入框1',
              isHidden: false,
              isLocked: false,
              props: {
                title: '姓名',
                placeholder: '请输入姓名',
              },
            },
            {
              uuid: Mock.Random.id(),
              type: 'QuestionInput',
              title: '输入框2',
              isHidden: false,
              isLocked: false,
              props: {
                title: '手机号',
                placeholder: '请输入手机号',
              },
            },
            {
              uuid: Mock.Random.id(),
              type: 'QuestionRadio',
              title: '单选111',
              isHidden: false,
              isLocked: false,
              props: {
                title: '性别',
                isVertical: false,
                options: [
                  {
                    text: '男',
                    value: '1',
                  },
                  {
                    text: '女',
                    value: '2',
                  },
                ],
                value: '1',
              },
            },
            {
              uuid: Mock.Random.id(),
              type: 'QuestionCheckBox',
              title: '多选1',
              isHidden: false,
              isLocked: false,
              props: {
                title: '兴趣爱好',
                isVertical: false,
                list: [
                  {
                    text: '篮球',
                    value: '1',
                    checked:false
                  },
                  {
                    text: '游泳',
                    value: '2',
                    checked:false
                  },
                  {
                    text: '足球',
                    value: '3',
                    checked:false
                  },
                  {
                    text: '画画',
                    value: '4',
                    checked:false
                  },
                ]
              },
            },
            {
              uuid: Mock.Random.id(),
              type: 'QuestionTextArea',
              title: '文本1',
              isHidden: false,
              isLocked: false,
              props: {
                title: '建议',
                placeholder: '请输入您的建议',
              },
            },
            {
              uuid: Mock.Random.id(),
              type: 'QuestionParagrap',
              title: '段落1',
              isHidden: false,
              isLocked: false,
              props: {
                text: '请确认输入完整信息，此信息仅为调查问卷使用，不会公开您的信息',
                isCenter: true,
              },
            },
          ],
        },
      }
    },
  },
  //创建问卷
  {
    url: '/api/question',
    method: 'post',
    response() {
      return {
        code: 200,
        msg: '创建成功',
        data: {
          id: Mock.Random.id(),
        },
      }
    },
  },
  //获取问卷列表
  {
    url: '/api/question',
    method: 'get',
    response(ctx) {
      const { url = '' } = ctx
      const { pageSize = 10 } = ctx.query
      const isDeleted = url.indexOf('isDeleted=true') >= 0
      return {
        code: 200,
        msg: '查询成功',
        data: {
          list: getQuestionList(pageSize, isDeleted), //当前页
          total: 100,
        },
      }
    },
  },

  //更新问卷
  {
    url: '/api/question/:id',
    method: 'patch',
    response(ctx) {
      return {
        code: 200,
        msg: '更新成功',
      }
    },
  },

  //复制问卷
  {
    url: '/api/question/duplicate/:id',
    method: 'post',
    response() {
      return {
        code: 200,
        msg: '复制成功',
        data: {
          id: Mock.Random.id(),
        },
      }
    },
  },

  //删除问卷
  {
    url: '/api/question',
    method: 'delete',
    response() {
      return {
        code: 200,
        msg: '删除成功',
      }
    },
  },
]
