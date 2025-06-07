<template>
  <div class="app">
    <!-- Fixed elements outside router-view -->
    <div class="fixed-elements">
      <Navbar />
      <div class="scroll-progress" :style="{ width: scrollProgress + '%' }"></div>
    </div>
    
    <!-- Main content -->
    <div class="content-wrapper">
      <router-view />
    </div>
    
    <Footer />
    <FloatingMagnet />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import FloatingMagnet from './components/FloatingMagnet.vue'

// Scroll progress tracking
const scrollProgress = ref(0)

const updateScrollProgress = () => {
  const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
  const scrolled = (window.scrollY / windowHeight) * 100
  scrollProgress.value = Math.min(100, Math.max(0, scrolled))
}

onMounted(() => {
  window.addEventListener('scroll', updateScrollProgress)
  updateScrollProgress() // Initialize progress
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateScrollProgress)
})

</script>

<style>
:root {
  --primary-color: #053961;
  --secondary-color: #D67D09;
  --accent-color: #669ACF;
  --background-color: #FBFBF9;
  --text-color: #1F2937;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body, .app {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: var(--text-color);
  background-color: var(--background-color);
  line-height: 1.5;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Fixed Elements */
.fixed-elements {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9000;
}

/* Scroll Progress Bar */
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--accent-color), #ff8a00);
  z-index: 9999; /* Extremely high z-index to ensure it's always on top */
  transition: width 0.1s ease-out;
  pointer-events: none; /* Allow clicking through the progress bar */
}

/* Content Wrapper */
.content-wrapper {
  min-height: calc(100vh - 140px); /* Adjust based on navbar and footer heights */
  position: relative;
}

/* Utility Classes */
.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: var(--accent-color);
  color: white;
}

.section {
  padding: 4rem 0;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
}

@media (max-width: 768px) {
  .section {
    padding: 3rem 0;
  }
  
  .section-title {
    font-size: 1.75rem;
  }
}
</style> 