import { createRouter, createWebHistory } from 'vue-router';
import LoginUser from '../components/LoginUser.vue';
import DashboardPage from '../components/Dashboard.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginUser },
  { path: '/dashboard', component: DashboardPage, meta: { requiresAuth: true } }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Guard para rotas privadas
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.meta.requiresAuth && !token) next('/login');
  else next();
});

export default router;
