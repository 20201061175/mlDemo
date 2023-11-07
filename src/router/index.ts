import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LinearRegression from '../views/LinearRegression.vue'
import LogisticRegression from '../views/LogisticRegression.vue'
import Knn from '../views/Knn.vue'
import KMeans from '../views/KMeans.vue'
import svm from '../views/svm.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/LinearRegression',
    name: 'LinearRegression',
    component: LinearRegression
  },
  {
    path: '/LogisticRegression',
    name: 'LogisticRegression',
    component: LogisticRegression
  },
  {
    path: '/Knn',
    name: 'Knn',
    component: Knn
  },
  {
    path: '/KMeans',
    name: 'KMeans',
    component: KMeans
  },
  {
    path: '/svm',
    name: 'svm',
    component: svm
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
