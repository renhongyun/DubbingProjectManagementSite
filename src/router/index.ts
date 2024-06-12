import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

const router = createRouter({
  // history: createWebHashHistory(import.meta.env.BASE_URL),
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/Login.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/views/test.vue')
    },
    {
      path: '/test2',
      name: 'test2',
      component: () => import('@/views/test2.vue')
    },
    {
      path: '/audio',
      name: 'audio',
      component: () => import('@/views/audio.vue')
    },
    {
      path: '/main',
      component: () => import('@/views/main/Main.vue'),
      children: [
        {
          path: 'home/carousel',
          component: () => import('@/views/main/home/carousel/carousel.vue')
        },
        {
          path: 'home/category',
          component: () => import('@/views/main/home/category/category.vue')
        },
        {
          path: 'author',
          component: () => import('@/views/main/author/author.vue')
        },
        {
          path: 'tag',
          component: () => import('@/views/main/tag/tag.vue')
        },
        {
          path: 'vga/audio',
          component: () => import('@/views/main/vga/audio/audio.vue')
        },
        {
          path: 'vga/video',
          component: () => import('@/views/main/vga/video/video.vue')
        }
      ]
    }
  ]
})
//路由守卫
export default router
// import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// const routes: Array<RouteRecordRaw> = [
//   {
//     path: '/',
//     redirect: '/login'
//   },
//   {
//     path: '/login',
//     component: () => import('@/views/Login.vue')
//   },
//   {
//     path: '/main',
//     component: () => import('@/components/MainLayout.vue'),
//     children: [
//       {
//         path: 'home/carousel',
//         component: () => import('@/views/main/home/carousel/carousel.vue')
//       },
//       {
//         path: 'home/category',
//         component: () => import('@/views/main/home/category/category.vue')
//       },
//       {
//         path: 'author',
//         component: () => import('@/views/main/author/author.vue')
//       },
//       {
//         path: 'tag',
//         component: () => import('@/views/main/tag/tag.vue')
//       },
//       {
//         path: 'home/audio',
//         component: () => import('@/views/main/vga/audio/audio.vue')
//       },
//       {
//         path: 'home/video',
//         component: () => import('@/views/main/vga/video/video.vue')
//       }
//     ]
//   }
// ]

// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes
// })

// export default router
