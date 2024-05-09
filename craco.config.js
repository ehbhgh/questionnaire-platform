//自带模块
const path = require('path')
const sassResourcesLoader = require('craco-sass-resources-loader')
const resolve = dir => path.resolve(__dirname, dir)
module.exports = {
  // antd包在craco增量配置中的按需加载配置
  babel: {
    plugins: [['import', { libraryName: 'antd', style: true }]],
  },
  devServer: {
    proxy: {
      '/api': 'http://localhost:3034',
    },
  },
  //起别名
  webpack: {
    alias: {
      //使用@代替根目录
      '@': resolve('src'),
      //使用component代替src/components
      components: resolve('src/components'),
    },
  },
  plugins: [
    {
      plugin: sassResourcesLoader,
      options: {
        resources: './src/style/variable.scss',
      },
    },
  ],
}
