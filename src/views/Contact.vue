<template>
  <div class="contact">
    <LeadCapture />
  </div>
</template>

<script>
import LeadCapture from '@/components/LeadCapture.vue'

export default {
  name: 'ContactView',
  components: {
    LeadCapture
  }
}
</script>

<style scoped>
.contact {
  padding: 2rem;
}
</style> 