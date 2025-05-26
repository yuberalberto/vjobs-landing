<template>
  <div class="home">
    <section id="home">
      <HeroSection />
    </section>
    <section id="services">
      <Services />
    </section>
    <section id="testimonials">
      <Testimonials />
    </section>
    <section id="contact">
      <ContactSection />
    </section>
    <section id="faqs">
      <FAQs />
    </section>
  </div>
</template>

<script>
import HeroSection from '@/components/HeroSection.vue'
import Services from '@/components/Services.vue'
import Testimonials from '@/components/Testimonials.vue'
import FAQs from '@/components/FAQs.vue'
import ContactSection from '@/components/ContactSection.vue'

export default {
  name: 'HomeView',
  components: {
    HeroSection,
    Services,
    Testimonials,
    FAQs,
    ContactSection
  }
}
</script>

<style scoped>
.home {
  min-height: 100vh;
}
</style> 