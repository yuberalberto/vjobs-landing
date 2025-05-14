<template>
  <div class="about">
    <AboutMe />
  </div>
</template>

<script>
import AboutMe from '@/components/AboutMe.vue'

export default {
  name: 'AboutView',
  components: {
    AboutMe
  }
}
</script>

<style scoped>
.about {
  padding: 2rem;
}
</style> 