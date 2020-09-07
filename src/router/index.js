import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '',
        component: () => import('../views/Index.vue'),
      },
      {
        path: '/about',
        component: () => import('../views/About.vue'),
      },
      {
        path: '/products',
        component: () => import('../views/Products.vue'),
      },
      {
        path: '/product/:id',
        component: () => import('../views/Product.vue'),
      },
      {
        path: '/cart',
        component: () => import('../views/Cart.vue'),
      },
      {
        path: '/checkout',
        component: () => import('../views//Checkout.vue'),
      },
      {
        path: '/complete/:id',
        component: () => import('../views/Complete.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/admin',
    component: () => import('../views/backend/Dashboard.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/backend/Products.vue'),
      },
      {
        path: 'coupons',
        component: () => import('../views/backend/Coupons.vue'),
      },
      {
        path: 'orders',
        component: () => import('../views/backend/Orders.vue'),
      },
      {
        path: 'storages',
        component: () => import('../views/backend/Storages.vue'),
      },
    ],
  },
  {
    path: '*',
    redirect: '/',
  },
];

const router = new VueRouter({
  routes,
});

export default router;
