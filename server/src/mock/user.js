const Mock = require('mockjs')

const Random = Mock.Random

module.exports = [
  //获取用户信息
  {
    url: '/api/user/info',
    method: 'get',
    response() {
      return {
        code: 200,
        msg: '',
        data: {
          userName: Random.title(),
          nickname: Random.cname(),
          url: Random.image('200x100')
        },
      }
    },
  },
  //注册
  {
    url: '/api/user/register',
    method: 'post',
    response() {
      return {
        code: 200,
        msg: '注册成功',
      }
    },
  },
  //登录
  {
    url: '/api/user/login',
    method: 'post',
    response() {
      return {
        code: 200,
        msg: '登录成功',
        data: {
          token: Random.word(20),
        },
      }
    },
  },
]
