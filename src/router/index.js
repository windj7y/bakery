import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import('../views/Home.vue'),
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
        path: '/favorite',
        component: () => import('../views/Favorite.vue'),
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
