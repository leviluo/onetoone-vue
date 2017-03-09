import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import home from '../views/Home/index.vue'
import membercenter from '../views/Membercenter/index.vue'

// const ItemView = resolve => {
//   // require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
//   // （代码分块）
//   require.ensure(['../views/ItemView.vue'], () => {
//     resolve(require('../views/ItemView.vue'))
//   },'ItemView')
// }


// const membercenter = resolve => {
//   // require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
//   // （代码分块）
//   require.ensure(['../views/membercenter.vue'], () => {
//     resolve(require('../views/membercenter.vue'))
//   },'membercenter')
// }

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/membercenter', component: membercenter },
    { path: '/', component: home }
  ]
})
