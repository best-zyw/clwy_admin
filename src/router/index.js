import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Articles from '../views/articles/article'
import ArticlesADD from '../views/articles/add'
import ArticlesEdit from '../views/articles/edit'
import articleCategories from '../views/article_categories/home'
import articleCategoriesAdd from '../views/article_categories/add'
import articleCategoriesEdit from '../views/article_categories/edit'
import courseCategories from '../views/course_categories/home'
import courseCategoriesAdd from '../views/course_categories/add'
import courseCategoriesEdit from '../views/course_categories/edit'
import courses from '../views/courses/home'
import coursesAdd from '../views/courses/add'
import coursesEdit from '../views/courses/edit'
import chapters from '../views/chapters/home'
import chaptersAdd from '../views/chapters/add'
import chaptersEdit from '../views/chapters/edit'
import users from '../views/users/home'
import usersAdd from '../views/users/add'
import usersEdit from '../views/users/edit'
import Echarts from '../views/echarts/user'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/adimn/articles',
    name: 'Articles',
    component: Articles
  },
  {
    path: '/adimn/articles/add',
    name: 'ArticlesADD',
    component: ArticlesADD
  },
  {
    path: '/adimn/articles/edit/:id',
    name: 'ArticlesEdit',
    component: ArticlesEdit
  },
  {
    path: '/admin/article_categories',
    name: 'articleCategories',
    component: articleCategories
  },
  {
    path: '/admin/article_categories/add',
    name: 'articleCategoriesAdd',
    component: articleCategoriesAdd
  },
  {
    path: '/adimn/article_categories/edit/:id',
    name: 'articleCategoriesEdit',
    component: articleCategoriesEdit
  },
  {
    path: '/admin/course_categories',
    name: 'courseCategories',
    component: courseCategories
  },
  {
    path: '/admin/course_categories/add',
    name: 'courseCategoriesAdd',
    component: courseCategoriesAdd
  },
  {
    path: '/adimn/course_categories/edit/:id',
    name: 'courseCategoriesEdit',
    component: courseCategoriesEdit
  },
  {
    path: '/admin/courses',
    name: 'courses',
    component: courses
  },
  {
    path: '/admin/courses/add',
    name: 'coursesAdd',
    component: coursesAdd
  },
  {
    path: '/adimn/courses/edit/:id',
    name: 'coursesEdit',
    component: coursesEdit
  },
  {
    path: '/admin/chapters',
    name: 'chapters',
    component: chapters
  },
  {
    path: '/admin/chapters/add',
    name: 'chaptersAdd',
    component: chaptersAdd
  },
  {
    path: '/admin/chapters/edit/:id',
    name: 'chaptersEdit',
    component: chaptersEdit
  },
  {
    path: '/admin/users',
    name: 'users',
    component: users
  },
  {
    path: '/admin/users/add',
    name: 'usersAdd',
    component: usersAdd
  },
  {
    path: '/admin/users/edit/:id',
    name: 'usersEdit',
    component: usersEdit
  },
  {
    path: '/admin/echarts',
    name: 'Echarts',
    component: Echarts
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
