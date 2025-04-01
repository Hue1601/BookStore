import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/LoginPage.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../views/FormPage.vue'),
    },
    {
      path: '/update/:id',
      name: 'update-user',
      component: () => import('../views/FormPage.vue'),
    },
    {
      path: '/product-management',
      name: 'product-management',
      component: () => import('../views/admin/ProductManagement.vue'),
    },
    {
      path: '/attribute',
      name: 'attribute',
      component: () => import('../views/admin/ProductAttribute.vue'),
    },
    {
      path: '/voucher',
      name: 'voucher',
      component: () => import('../views/admin/VoucherPage.vue'),
    },
    {
      path: '/add-voucher',
      name: 'add-voucher',
      component: () => import('../views/admin/AddVoucherPage.vue'),
    },
    {
      path: '/update-voucher/:id',
      name: 'update-voucher',
      component: () => import('../views/admin/AddVoucherPage.vue'),
    },


  ],
})

export default router
