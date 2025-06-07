<template>
  <nav class="navbar" :class="{ 'navbar-scrolled': isScrolled, 'menu-open': isMenuOpen }">
    <!-- Overlay para cerrar el menú -->
    <div 
      v-if="isMenuOpen" 
      class="menu-overlay" 
      @click="closeMenu"
    ></div>
    <div class="container navbar-container">
      <div class="logo">
        <router-link to="/" class="logo-link" @click="goHome">
          <img src="@/assets/logo.png" alt="VJobs Logo" class="logo-img" />
        </router-link>
      </div>
      
      <!-- Botón de menú hamburguesa (solo móviles) -->
      <button 
        class="mobile-menu-button" 
        @click="toggleMenu"
        aria-label="Toggle menu"
        aria-expanded="isMenuOpen"
      >
        <i class="fas" :class="isMenuOpen ? 'fa-times' : 'fa-bars'"></i>
      </button>
      
      <!-- Contenedor de navegación -->
      <div class="nav-content" :class="{ 'mobile-visible': isMenuOpen }">
        <div class="nav-links">
          <router-link 
            v-for="section in ['home', 'services', 'testimonials', 'faqs']"
            :key="section"
            :to="{ path: '/', hash: `#${section}` }"
            class="nav-link"
            :class="{ active: activeSection === section }"
            @click="handleNavClick(section)"
          >
            {{ section.charAt(0).toUpperCase() + section.slice(1) }}
          </router-link>
        </div>
        
        <div class="nav-buttons">
          <router-link
            :to="{ path: '/', hash: '#contact' }"
            class="btn btn-primary"
            @click="handleNavClick('contact')"
          >
            <span class="desktop-text">Diagnóstico inicial gratuito</span>
            <span class="mobile-text">Contacto</span>
          </router-link>
        </div>
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
const isMenuOpen = ref(false)

// Methods
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  if (isMenuOpen.value) {
    // Usamos setTimeout para evitar que el clic actual cierre inmediatamente el menú
    setTimeout(() => {
      document.addEventListener('click', handleClickOutside)
    }, 0)
  } else {
    document.removeEventListener('click', handleClickOutside)
  }
}

const closeMenu = () => {
  isMenuOpen.value = false
  document.removeEventListener('click', handleClickOutside)
}

const handleClickOutside = (event) => {
  const navContent = document.querySelector('.nav-content')
  const menuButton = document.querySelector('.mobile-menu-button')
  
  if (isMenuOpen.value && 
      !navContent.contains(event.target) && 
      !menuButton.contains(event.target)) {
    closeMenu()
  }
}

const handleNavClick = (section) => {
  scrollToSection(section)
  closeMenu()
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
  updateActiveSection()
}

const handleResize = () => {
  if (window.innerWidth > 768 && isMenuOpen.value) {
    closeMenu()
  }
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
  window.addEventListener('resize', handleResize)
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
  window.removeEventListener('resize', handleResize)
  document.removeEventListener('click', handleClickOutside)
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
  position: relative;
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

.nav-content {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.mobile-text {
  display: none;
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

.nav-buttons {
  display: flex;
  gap: 1rem;
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

/* Mobile Menu Button */
.mobile-menu-button {
  display: none; /* Hidden by default */
  background: none;
  border: none;
  color: #FBFBF9;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 1001;
  padding: 0.5rem;
  transition: transform 0.3s ease;
}

.menu-open .mobile-menu-button {
  transform: rotate(90deg);
}

.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: 0;
  transition: opacity 0.3s ease;
  backdrop-filter: blur(2px);
}

.menu-open .menu-overlay {
  opacity: 1;
}

/* Mobile styles */
@media (max-width: 768px) {
  .mobile-menu-button {
    display: block; /* Show on mobile */
  }
  
  .nav-content {
    display: none;
    position: fixed;
    top: 0;
    right: 0;
    width: 80%;
    max-width: 300px;
    height: 100vh;
    background: rgba(5, 57, 97, 0.95);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    padding: 5rem 2rem 2rem;
    z-index: 1000;
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.2);
    overflow-y: auto;
    pointer-events: auto;
    opacity: 0;
    transform: translateX(100%);
    transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  .nav-content.mobile-visible {
    display: block;
    opacity: 1;
    transform: translateX(0);
  }
  
  .nav-links {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .nav-buttons {
    width: 100%;
  }
  
  .btn-primary {
    width: 100%;
    text-align: center;
    padding: 0.75rem;
  }
  
  .desktop-text {
    display: none;
  }
  
  .mobile-text {
    display: inline;
  }
  
  .navbar-container {
    padding: 1rem;
    position: relative;
  }
  
  .logo-img {
    height: 32px;
  }
}
</style>