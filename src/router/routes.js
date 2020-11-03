
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'login', component: () => import('pages/Login.vue') },
      { path: 'help', component: () => import('pages/Help.vue') },
      { path: 'home', component: () => import('pages/Home.vue') },
      { path: 'register', component: () => import('pages/Register.vue') },
      { path: 'edituser', component: () => import('pages/EditUser.vue') },
      { path: 'user', component: () => import('pages/User.vue') },
      { path: 'filterCategory/:idCategory', component: () => import('pages/FilterCategory.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
