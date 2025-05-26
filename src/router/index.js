import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import LegalLayout from '@/views/LegalLayout.vue'
import TermsOfService from '@/views/legal/TermsOfService.vue'
import PrivacyPolicy from '@/views/legal/PrivacyPolicy.vue'
import CookiesPolicy from '@/views/legal/CookiesPolicy.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/:section',
      name: 'section',
      component: Home
    },
    {
      path: '/legal',
      component: LegalLayout,
      children: [
        {
          path: 'terms',
          name: 'terms',
          component: TermsOfService
        },
        {
          path: 'privacy',
          name: 'privacy',
          component: PrivacyPolicy
        },
        {
          path: 'cookies',
          name: 'cookies',
          component: CookiesPolicy
        }
      ]
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    } else {
      return { top: 0 }
    }
  }
})

export default router