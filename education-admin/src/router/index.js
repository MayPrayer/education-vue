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
        meta: { title: '教师添加', noCache: true },
        hidden: true
      }
    ]
  },
  {
    path: '/subject',
    component: Layout,
    redirect: '/subject/list',
    name: '课程分类管理',
    meta: { title: '课程分类管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: '课程分类列表',
        component: _import('edu/subject/list'),
        meta: { title: '课程分类列表', icon: 'table' }
      },
      {
        path: 'add',
        name: '课程分类添加',
        component: _import('edu/subject/add'),
        meta: { title: '课程分类添加', icon: 'tree' } // title为菜单名称
      }
    ]
  },
  {
    path: '/course',
    component: Layout,
    redirect: '/course/list',
    name: '课程管理',
    meta: { title: '课程管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: '课程列表',
        component: _import('edu/course/list'),
        meta: { title: '课程列表', icon: 'table' }
      },
      {
        path: 'info',
        name: '课程添加',
        component: _import('edu/course/info'),
        meta: { title: '课程添加', icon: 'tree', keepAlive: true } // title为菜单名称
      },
      {
        path: 'info/:id',
        name: '课程添加',
        component: _import('edu/course/info'),
        meta: { title: '课程添加', noCache: true, keepAlive: true },// title为菜单名称
        hidden: true
      },
      {
        path: 'publish/:id',
        name: '课程发布',
        component: _import('edu/course/publish'),
        meta: { title: '课程列表', noCache: true, keepAlive: true },
        hidden: true
      },
      {
        path: 'chapter/:id',
        name: '课程章节',
        component: _import('edu/course/chapter'),
        meta: { title: '课程列表', noCache: true, keepAlive: true },
        hidden: true
      }
    ]
  },
  {
    path: '/statistics',
    component: Layout,
    redirect: '/statistics/create',
    name: '统计管理',
    meta: { title: '统计管理', icon: 'example' },
    children: [
      {
        path: 'create',
        name: '生成数据',
        component: _import('edu/statistics/create'),
        meta: { title: '生成数据', icon: 'table' }
      },
      {
        path: 'table',
        name: '图表显示',
        component: _import('edu/statistics/table'),
        meta: { title: '图表显示', icon: 'table' }
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

