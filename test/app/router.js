
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@app/page/Example.vue'),
  },
  // {
  //   path: '/test',
  //   name: 'test',
  //   component: () => import('./page/Test/Test'),
  // },

];


const router = createRouter({
  // history: createWebHistory(),
  history: createWebHashHistory(),
  routes: routes,
});

export default router;
