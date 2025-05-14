<template>
  <div class="home">
    <Navbar />
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
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import HeroSection from '@/components/HeroSection.vue'
import Services from '@/components/Services.vue'
import Testimonials from '@/components/Testimonials.vue'
import FAQs from '@/components/FAQs.vue'
import ContactSection from '@/components/ContactSection.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'HomeView',
  components: {
    Navbar,
    HeroSection,
    Services,
    Testimonials,
    FAQs,
    ContactSection,
    Footer
  }
}
</script>

<style scoped>
.home {
  min-height: 100vh;
}
</style> 