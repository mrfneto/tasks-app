export default [
  {
    path: '/',
    component: () => import('@/layouts/Default.vue'),
    // meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/HomeView.vue'),
        meta: { title: 'Home' }
      }
    ]
  }
  // {
  //   path: '/auth',
  //   component: () => import('@/layouts/AuthLayout.vue'),
  //   meta: { requiresGuest: true },
  //   children: [
  //     { path: '', redirect: { name: 'Login' } },
  //     {
  //       path: 'register',
  //       name: 'Register',
  //       component: () => import('@/components/auth/Register.vue'),
  //       meta: { title: 'Register' }
  //     },
  //     {
  //       path: 'login',
  //       name: 'Login',
  //       component: () => import('@/components/auth/Login.vue'),
  //       meta: { title: 'Login' }
  //     },
  //     {
  //       path: 'recovery',
  //       name: 'Recovery',
  //       component: () => import('@/components/auth/Recovery.vue'),
  //       meta: { title: 'Recovery' }
  //     }
  //   ]
  // }
]
