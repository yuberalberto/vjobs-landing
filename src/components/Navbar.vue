<template>
  <nav class="navbar" :class="{ 'navbar-scrolled': isScrolled }">
    <div class="container navbar-container">
      <div class="logo">
        <router-link to="/" class="logo-link" @click="goHome">
          <img src="@/assets/logo.png" alt="VJobs Logo" class="logo-img" />
        </router-link>
      </div>
      <div class="nav-links">
  <router-link v-for="section in ['home', 'services', 'testimonials', 'faqs']"
    :key="section"
    :to="{ path: '/', hash: `#${section}` }"
    class="nav-link"
    :class="{ active: activeSection === section }"
    @click="scrollToSection(section)"
  >
    {{ section.charAt(0).toUpperCase() + section.slice(1) }}
  </router-link>
</div>
<div class="nav-buttons">
  <router-link
    :to="{ path: '/', hash: '#contact' }"
    class="btn btn-primary"
    @click="scrollToSection('contact')"
  >Diagnóstico inicial gratuito</router-link>
</div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// Reactive state
const isScrolled = ref(false)
const activeSection = ref('home')

// Methods
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
  updateActiveSection()
}

const updateActiveSection = () => {
  const sections = ['home', 'services', 'testimonials', 'contact', 'faqs']
  const scrollPosition = window.scrollY + window.innerHeight / 3

  for (const section of sections) {
    const element = document.getElementById(section)
    if (element) {
      const { offsetTop, offsetHeight } = element
      if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
        activeSection.value = section
        break
      }
    }
  }
}

// No longer needed as progress is tracked in App.vue

const scrollToSection = (sectionId) => {
  // Only handle smooth scrolling if already on home page
  if (route.path === '/') {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
      activeSection.value = sectionId
    }
  }
  // If not on home, router-link will handle navigation
}

const goHome = (event) => {
  event.preventDefault()
  
  // If not on home page, navigate to home
  if (route.path !== '/') {
    router.push('/')
    return
  }
  
  // If already on home page, just scroll to top and clean URL
  window.history.pushState({}, '', '/')
  window.scrollTo({ top: 0, behavior: 'smooth' })
  activeSection.value = 'home'
}

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll() // Initialize active section
  
  // Handle hash navigation when route changes
  router.afterEach((to) => {
    if (to.path === '/' && to.hash) {
      // Extract section ID from hash
      const sectionId = to.hash.substring(1)
      // Wait for DOM to update
      setTimeout(() => {
        const section = document.getElementById(sectionId)
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' })
          activeSection.value = sectionId
        }
      }, 100)
    }
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.navbar {
  width: 100%;
  background-color: var(--primary-color);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.navbar-scrolled {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: rgba(5, 57, 97, 0.95);
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.logo-img {
  height: 40px;
  width: auto;
  display: block;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: #FBFBF9;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 0;
  position: relative;
  transition: color 0.3s ease;
  cursor: pointer;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--accent-color);
  transition: width 0.3s ease;
}

.nav-link:hover::after,
.nav-link.active::after {
  width: 100%;
}

.nav-link:hover,
.nav-link.active {
  color: var(--accent-color);
}

.btn-primary {
  background-color: var(--accent-color);
  color: #FBFBF9;
  padding: 0.5rem 1.5rem;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background-color: var(--accent-color);
  color: var(--primary-color);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
  
  .navbar-container {
    padding: 1rem;
  }
  .logo-img {
    height: 32px;
  }
}
</style> 