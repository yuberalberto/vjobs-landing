<template>
  <div class="legal-layout">
    <Navbar />
    <main class="legal-content">
      <div class="container">
        <router-view />
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'LegalLayout',
  components: {
    Navbar,
    Footer
  }
}
</script>

<style scoped>
.legal-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.legal-content {
  flex: 1;
  padding: 4rem 0;
  background-color: #f8f9fa;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}
</style>
