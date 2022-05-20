
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('./page/work-example'),
  },

];


const router = createRouter({
  // history: createWebHistory(),
  history: createWebHashHistory(),
  routes: routes,
});

export default router;
