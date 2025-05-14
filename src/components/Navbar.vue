<template>
  <nav class="navbar" :class="{ 'navbar-scrolled': isScrolled }">
    <div class="container navbar-container">
      <div class="logo">
        <router-link to="/" class="logo-link">
          <img src="@/assets/logo.png" alt="VJobs Logo" class="logo-img" />
        </router-link>
      </div>
      <div class="nav-links">
        <a href="#home" class="nav-link" :class="{ active: activeSection === 'home' }" @click.prevent="scrollToSection('home')">Home</a>
        <a href="#services" class="nav-link" :class="{ active: activeSection === 'services' }" @click.prevent="scrollToSection('services')">Services</a>
        <a href="#testimonials" class="nav-link" :class="{ active: activeSection === 'testimonials' }" @click.prevent="scrollToSection('testimonials')">Testimonials</a>
        <a href="#faqs" class="nav-link" :class="{ active: activeSection === 'faqs' }" @click.prevent="scrollToSection('faqs')">FAQs</a>
      </div>
      <div class="nav-buttons">
        <a href="#contact" class="btn btn-primary" @click.prevent="scrollToSection('contact')">Diagnóstico inicial gratuito</a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      isScrolled: false,
      activeSection: 'home'
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    this.handleScroll() // Inicializar la sección activa
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 50
      this.updateActiveSection()
    },
    updateActiveSection() {
      const sections = ['home', 'services', 'testimonials', 'contact', 'faqs']
      const scrollPosition = window.scrollY + window.innerHeight / 3

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            this.activeSection = section
            break
          }
        }
      }
    },
    scrollToSection(sectionId) {
      const section = document.getElementById(sectionId)
      if (section) {
        // Añadir clase para la animación de página
        document.body.classList.add('page-transitioning')
        
        // Scroll suave a la sección
        section.scrollIntoView({ behavior: 'smooth' })
        
        // Actualizar la URL sin recargar
        history.pushState(null, '', `/#${sectionId}`)
        
        // Actualizar la sección activa
        this.activeSection = sectionId
        
        // Remover la clase de animación después de la transición
        setTimeout(() => {
          document.body.classList.remove('page-transitioning')
        }, 500)
      }
    }
  }
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: var(--primary-color);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  z-index: 1000;
}

.navbar-scrolled {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
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