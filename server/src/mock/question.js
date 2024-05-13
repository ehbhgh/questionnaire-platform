const Mock = require('mockjs')
const getQuestionList = require('./getQuestionList')
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
      const {url=""}=ctx;
      const {pageSize=10}=ctx.query
      const isDeleted=url.indexOf("isDeleted=true")>=0
      return {
        code: 200,
        msg: '查询成功',
        data: {
          list: getQuestionList(pageSize,isDeleted), //当前页
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
  }
]
