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
    },
    // Catch-all route
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // Check if it's a page refresh
    if (window.performance && window.performance.navigation.type === 1) {
      return { top: 0 }
    }

    // If there's a saved position (like when using browser back/forward)
    if (savedPosition) {
      return savedPosition
    }
    
    // If navigating to a hash on the same page
    if (to.hash && to.path === from.path) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }
    
    // Default: scroll to top
    return { top: 0 }
  }
})

export default router