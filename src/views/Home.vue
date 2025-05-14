<template>
  <div class="home">
    <Navbar />
    <section id="home">
      <HeroSection />
    </section>
    <section id="about">
      <AboutMe />
    </section>
    <section id="services">
      <Services />
    </section>
    <section id="testimonials">
      <Testimonials />
    </section>
    <section id="faqs">
      <FAQs />
    </section>
    <section id="contact">
      <CallToAction />
    </section>
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import HeroSection from '@/components/HeroSection.vue'
import AboutMe from '@/components/AboutMe.vue'
import Services from '@/components/Services.vue'
import Testimonials from '@/components/Testimonials.vue'
import FAQs from '@/components/FAQs.vue'
import CallToAction from '@/components/CallToAction.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'HomeView',
  components: {
    Navbar,
    HeroSection,
    AboutMe,
    Services,
    Testimonials,
    FAQs,
    CallToAction,
    Footer
  }
}
</script>

<style scoped>
.home {
  min-height: 100vh;
}
</style> 