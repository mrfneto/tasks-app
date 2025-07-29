import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true, title: 'Home' }
    },
    {
      path: '/form/create',
      name: 'form-create',
      component: () => import('../views/FormView.vue'),
      meta: { requiresAuth: true, title: 'Form' }
    },
    {
      path: '/form/:id/update',
      name: 'form-update',
      component: () => import('../views/FormView.vue'),
      meta: { requiresAuth: true, title: 'Form' }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { requiresAuth: false, title: 'Login' }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  document.title = `${to.meta.title} - Tasks App`

  const authStore = useAuthStore()

  const user = await authStore.getCurrentUser()

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!user) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
