import Vue from 'vue'
import Router from 'vue-router'

const _import = require('./_import_' + process.env.NODE_ENV)
Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('404'), hidden: true },
  /**
   路由根到直接跳转 /dashboard
   **/
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index')
    }]
  },
  // example左侧菜单
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table', // 展开table选项单
    name: 'Example',
    meta: { title: 'Example', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: _import('table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: _import('tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },
  {
    path: '/form', // form菜单
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: _import('form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },
  // teacher菜单
  {
    path: '/teacher',
    component: Layout,
    redirect: '/teacher/list',
    name: '教师管理',
    meta: { title: '教师管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: '教师列表',
        component: _import('edu/teacher/list'),
        meta: { title: '教师列表', icon: 'table' }
      },
      {
        path: 'add',
        name: '教师添加',
        component: _import('edu/teacher/add'),
        meta: { title: '教师添加', icon: 'tree' } // title为菜单名称
      },
      {
        path: 'update/:id',
        name: '教师修改',
        component: _import('edu/teacher/add'),
        meta: { title: '教师添加',noCache:true},
        hidden: true
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

