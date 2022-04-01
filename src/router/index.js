import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  // 前台
  {
    path: '/',
    name: 'Frontend',
    component: () => import('../views/Frontend.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue'),
        meta: {
          title: 'HAPPY HOURS | 歡迎光臨'
        }
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('../views/About.vue'),
        meta: {
          title: 'HAPPY HOURS | 聊聊我們'
        }
      },
      {
        path: 'products',
        name: 'Products',
        component: () => import('../views/Products.vue'),
        meta: {
          title: 'HAPPY HOURS | 品嚐美食'
        }
      },
      {
        path: 'product/:id',
        name: 'Product',
        component: () => import('../views/Product.vue'),
        meta: {
          title: 'HAPPY HOURS | 品嚐美食'
        }
      },
      {
        path: 'contact',
        name: 'Contact',
        component: () => import('../views/Contact.vue'),
        meta: {
          title: 'HAPPY HOURS | 做個朋友'
        }
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () => import('../views/Cart.vue'),
        meta: {
          title: 'HAPPY HOURS | 購物車-填寫資料'
        }
      },
      {
        path: 'order-info/:id',
        name: 'OrderInfo',
        component: () => import('../views/OrderInfo.vue'),
        meta: {
          title: 'HAPPY HOURS | 購物車-訂單確認'
        }
      },
      {
        path: 'order-complete',
        name: 'OrderComplete',
        component: () => import('../views/OrderComplete.vue'),
        meta: {
          title: 'HAPPY HOURS | 購物車-完成訂單'
        }
      }
    ]
  },
  // 登入路由獨立
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      title: 'HAPPY HOURS | 登入'
    }
  },
  // 後台
  {
    path: '/admin',
    name: 'Dashboard',
    component: () => import('../views/Dashboard/Dashboard.vue'),
    children: [
      {
        path: 'products',
        name: 'adminProducts',
        component: () => import('../views/Dashboard/Products.vue'),
        meta: {
          title: '後台 | 產品管理'
        }
      },
      {
        path: 'orders',
        name: 'Orders',
        component: () => import('../views/Dashboard/Orders.vue'),
        meta: {
          title: '後台 | 訂單管理'
        }
      },
      {
        path: 'coupons',
        name: 'Coupons',
        component: () => import('../views/Dashboard/Coupons.vue'),
        meta: {
          title: '後台 | 優惠券管理'
        }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkExactActiveClass: 'active',
  scrollBehavior (to, from, savedPosition) {
    return {
      top: 0
    }
  }
})

export default router
